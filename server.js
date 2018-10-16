const compression = require("compression");
const express = require("express");
const next = require("next");
const fetch = require("isomorphic-unfetch");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const renderBasedOnRoute = (req, res, type) => {
  const queryParams = {
    pageId: req.query.pageId
  };
  if (queryParams.pageId) {
    app.render(req, res, `/${type}`, queryParams);
    return;
  }
  return handle(req, res);
};

const getDataFromHackerWebApp = (pageType, pageId) => {
  return Promise.all([
    fetch(`https://api.hackerwebapp.com/${pageType}?page=${pageId}`)
      .then(res => res.json())
      .catch(err => {
        return { error: err };
      }),
    fetch(`https://api.hackerwebapp.com/${pageType}?page=${pageId + 1}`)
      .then(res => res.json())
      .catch(err => {
        return { error: err };
      })
  ]);
};

app.prepare().then(() => {
  const perPage = 30;
  const server = express();
  server.use(compression());

  server.get("/api/:pageType/:pageId", (req, res) => {
    const queryParams = {
      pageId: parseInt(req.params.pageId, 10),
      pageType: req.params.pageType
    };

    getDataFromHackerWebApp(queryParams.pageType, queryParams.pageId).then(
      data => {
        let currPageData = data[0];
        let nextPageData = data[1];

        // If any API results in error
        if (currPageData.error || nextPageData.error) {
          res.json({
            error: currPageData.error || nextPageData.error
          });
          return;
        }

        // If any API has length 0
        if (!currPageData.length) {
          res.json({
            error: {
              message: "No data available"
            }
          });
          return;
        }

        // Check to see if next page data matches current page data
        if (currPageData.length && nextPageData.length) {
          if (currPageData[0].id === nextPageData[0].id) {
            nextPageData = [];
          }
        }

        const currPage = queryParams.pageId;
        const nextPage = nextPageData.length > 0 ? currPage + 1 : null;
        const prevPage = currPage - 1 <= 0 ? null : currPage - 1;

        const pagination = {
          currPage,
          prevPage,
          nextPage
        };

        res.json({
          pagination,
          data: currPageData
        });
      }
    );
  });

  server.get("/top", (req, res) => {
    return renderBasedOnRoute(req, res, "top");
  });
  server.get("/new", (req, res) => {
    return renderBasedOnRoute(req, res, "new");
  });
  server.get("/show", (req, res) => {
    return renderBasedOnRoute(req, res, "show");
  });
  server.get("/ask", (req, res) => {
    return renderBasedOnRoute(req, res, "ask");
  });
  server.get("/jobs", (req, res) => {
    return renderBasedOnRoute(req, res, "jobs");
  });

  server.get("/", (req, res) => {
    res.redirect("/top");
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

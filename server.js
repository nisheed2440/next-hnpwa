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

const getItemsData = items => {
  let promiseArray = [];
  items.forEach(item => {
    promiseArray.push(
      fetch(` https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then(res => res.json())
        .then(data => data)
    );
  });
  return Promise.all(promiseArray);
};

app.prepare().then(() => {
  const perPage = 30;
  const server = express();
  server.use(compression());

  server.get("/api/:pageType/:pageId", (req, res) => {
    const queryParams = {
      pageId: req.params.pageId,
      pageType: req.params.pageType
    };
    fetch(
      `https://hacker-news.firebaseio.com/v0/${
        queryParams.pageType
      }stories.json`
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          res.json({
            error: data.error
          });
          return;
        }

        const totalPages = Math.ceil(data.length / perPage);
        let currPage = parseInt(queryParams.pageId, 10);
        let isRedirect = false;

        if (currPage > totalPages) {
          currPage = totalPages;
          isRedirect = true;
        }
        if (currPage <= 0) {
          currPage = 1;
          isRedirect = true;
        }

        if (isRedirect) {
          res.json({
            isRedirect,
            toPage: currPage
          });
          return;
        }

        const prevPage = currPage - 1 <= 0 ? null : currPage - 1;
        const nextPage = currPage + 1 > totalPages ? null : currPage + 1;
        const pagination = {
          totalPages,
          currPage,
          prevPage,
          nextPage
        };

        const pageData = data.slice(
          !prevPage ? 0 : prevPage * perPage,
          currPage * perPage
        );

        getItemsData(pageData).then(result => {
          res.json({
            pagination,
            data: result
          });
        });
      });
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

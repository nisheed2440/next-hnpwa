const functions = require("firebase-functions");
const next = require("next");
const express = require("express");
const compression = require("compression");
const fetch = require("isomorphic-unfetch");

var dev = process.env.NODE_ENV !== "production";
var app = next({ dev, conf: { distDir: "next" } });
var handle = app.getRequestHandler();

const renderBasedOnRoute = (req, res, type) => {
  const queryParams = {
    pageId: req.query.pageId,
    itemId: req.query.itemId
  };

  if (Object.values(queryParams).length) {
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

const getItemFromHackerWebApp = itemId => {
  return fetch(`https://api.hackerwebapp.com/item/${itemId}`)
    .then(res => res.json())
    .catch(err => {
      return { error: err };
    });
};

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl); // log the page.js file that is being requested
  return app.prepare().then(() => {
    const server = express();
    server.use(compression());

    server.get("/api/page/:pageType/:pageId", (req, res) => {
      const queryParams = {
        pageId: parseInt(req.params.pageId, 10),
        pageType: req.params.pageType
      };

      getDataFromHackerWebApp(queryParams.pageType, queryParams.pageId)
        .then(data => {
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
          // Quirk with news
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
        })
        .catch(err => {
          res.json({
            error: {
              err,
              message: "No data available"
            }
          });
        });
    });

    server.get("/api/item/:itemId", (req, res) => {
      const itemId = req.params.itemId;
      if (itemId) {
        getItemFromHackerWebApp(itemId)
          .then(data => {
            if (data.error) {
              res.json({
                error: {
                  message: "No data available"
                }
              });
              return;
            }
            res.json({ data });
            return;
          })
          .catch(err => {
            res.json({
              error: {
                err,
                message: "No data available"
              }
            });
          });
      } else {
        res.json({
          error: {
            message: "No data available"
          }
        });
        return;
      }
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
    server.get("/comments", (req, res) => {
      return renderBasedOnRoute(req, res, "comments");
    });
    server.get("/", (req, res) => {
      return res.redirect("/top");
    });
    server.get("**", (req, res) => {
      return handle(req, res);
    });
    server(req, res);
  });
});

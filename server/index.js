const express = require("express");
const session = require("express-session");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const { parse } = require("url");

const next = require("next");

// Set Environment
const dev = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

// Next App
const app = next({ dir: "./app", dev });
const handle = app.getRequestHandler();

// Sequelize
const models = require("./db/models");

/**
 * Front end Routes
 */
const getRoutes = require("./routes");
const routes = getRoutes();

app
  .prepare()
  .then(() => {
    const server = express();

    // Generate Unique Session Secret tokens
    server.use(
      session({
        secret: uuid.v1(),
        name: "sessionId",
        resave: true,
        saveUninitialized: true
      })
    );

    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.get("/api/gallery/:category", (req, res) => {
      // Parse url param, slashesDenoteHost
      const { category } = req.params;
      const pieces = [{ name: "Timmy" }, { name: "Tyler" }]
      res.json(pieces);
    });
    // Use React application on server
    server.get("*", (req, res) => {
      // Parse url param, slashesDenoteHost
      const parsedUrl = parse(req.url, true);
      let { pathname, query = {} } = parsedUrl;

      if (pathname.includes("gallery")) {
        const category = pathname.replace('/gallery', '');
        pathname = "/gallery";
      }
      /**
       * Pull in front end routes, and check request against those routes
       */
      const route = routes[pathname];
      if (route) {
        return app.render(req, res, route.page, query);
      }
      return handle(req, res);
    });

    // Connect to DB
    models.sequelize.sync().then(function () {
      server.listen(PORT, err => {
        if (err) throw err;
        console.log(`> Ready on ${PORT}`);
      });
    });
  })
  .catch(ex => {
    // Exit if there is an exception
    console.error(ex.stack);
    process.exit(1);
  });

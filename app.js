// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// session config 
require("./config/session.config")(app)

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "Tech-juniors";

app.locals.appTitle = `${capitalized(projectName)}`;

// 👇 Start handling routes here
app.use((req, res, next) => {
    if (req.session.user) {
        app.locals.nav = req.session.user.role
        next();
        return;
    } else {
        app.locals.nav = null
    }
    next();
})

app.use((req, res, next) => {
    if (req.session.user && req.session.user.role === 'COMPANY') {
        app.locals.navJob = req.session.user.role
        next();
        return;
    } else {
        app.locals.navJob = null
    }
    next();
})

const index = require("./routes/index.routes");
app.use("/", index);

const jobs = require("./routes/jobs.routes");
app.use("/", jobs);

const auth = require("./routes/auth.routes");
app.use("/auth", auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

require("./config/session.config")(app)

const projectName = "Tech-juniors";

app.locals.appTitle = `${projectName}`;

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

require("./error-handling")(app);

module.exports = app;

const router = require("express").Router();
const JobsService = require('../services/axios.service')
const JobsAPI = new JobsService();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render('index');
});

// Search from homepage
router.get("/search/jobs", (req, res, next) => {
  const { keywords, locationName } = req.query

  JobsAPI
    .getJobsSearch(keywords, locationName)
    .then(({ results }) => {
      res.render('jobs/jobs-search', { results })
    })
    .catch((err) => {
      next(err)
    })
});

module.exports = router;

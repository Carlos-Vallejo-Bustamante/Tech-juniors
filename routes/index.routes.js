const router = require("express").Router();
const AxiosJuniors = require('../services/axios.services')
const axiosJob = new AxiosJuniors();
const JobModel = require('../models/Job.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render('index');
});


// Search from homepage
router.get("/search/jobs", (req, res, next) => {
  const { keywords, locationName } = req.query
  axiosJob
    .getJobsSearch(keywords, locationName)
    .then(({ results }) => {
      console.log(results)
      res.render('jobs/jobs-search', { results })
    })
    .catch((err) => {
      next(err)
    })
});

module.exports = router;

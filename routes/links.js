const express = require('express');
const router = express.Router();
const pool = require("../database")

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const [result] = await pool.query("select 1+1")
  res.json(result)
});

module.exports = router;

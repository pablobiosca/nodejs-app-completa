const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render("auth/signup")
});

router.post('/signup', function(req, res, next) {
  console.log(req.body)
  res.send("datos recibidos")
});

module.exports = router;

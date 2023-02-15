const express = require('express');
const router = express.Router();
const pool = require("../database")

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const [result] = await pool.query("select 1+1")
  res.json(result)
});

router.get("/add", (req,res)=>{
  res.render("lnks/add")
})

router.post("/add", (req,res)=>{
  res.send("recibido macho")
})

module.exports = router;

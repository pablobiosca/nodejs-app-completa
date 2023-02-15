const express = require('express');
const router = express.Router();
const pool = require("../database")

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const [links] = await pool.query("select * from links")

  console.log(links)

  res.render("lnks/list",{links})

});

router.get("/add", (req,res)=>{
  res.render("lnks/add")
})

router.post("/add", async (req,res)=>{

  const {title,url,description} = req.body

  const newlink = {title,url,description}

  await pool.query("insert into links SET ?",[newlink])

  req.flash("success","Link saved successfully")

  res.redirect("/links")
})

router.get("/delete/:id", async (req,res)=>{
  const {id} = req.params

  await pool.query("delete from links where id_link = ?",[id])

  req.flash("success","Link deleted successfully")

  res.redirect("/links")
})

router.get("/edit/:id", async (req,res)=>{
  const {id} = req.params

  // await pool.query("delete from links where id_link = ?",[id])

  const [link] = await pool.query("select * from links where id_link = ?",[id])

  console.log(link)

  
  res.render("lnks/edit",{link:link[0]})
})

router.post( "/edit/:id" , async (req,res)=>{
  const {id} = req.params
  const {title,url,description} = req.body
  
  const new_link = {title,url,description}
  
  console.log(new_link)
  await pool.query("update links set ? where id_link= ?",[new_link,id])
  req.flash("success","Link edited successfully")
  res.redirect("/links")
  
} )

module.exports = router;

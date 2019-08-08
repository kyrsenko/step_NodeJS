const Router = require("express")
const Note = require('../models/note')
const router = Router()

router.get('/', async (req,res)=>{
    const notes = await Note.find({})
    res.render('index',{
        pageTitle:'main page',
        notes
    })
})

module.exports = router
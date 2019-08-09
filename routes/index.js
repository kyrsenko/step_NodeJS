const Router = require("express")
const Note = require('../models/note')

const router = Router()
const TODO = require('../models/list')

router.get('/', async (req,res)=>{
    try {
        const lists = await TODO.find({})
        const notes = await Note.find({})
        res.render('index',{
            pageTitle:'main page',
            lists,
            notes
        })
    } catch (error) {
        console.log(error);
    }
})



module.exports = router
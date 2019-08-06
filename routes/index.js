const Router = require("express")
const router = Router()
const TODO = require('../models/list')

router.get('/', async (req,res)=>{
    try {
        const lists = await TODO.find({})
        res.render('index',{
            pageTitle:'main page',
            lists
        })
    } catch (error) {
        console.log(error);
    }
    
})



module.exports = router
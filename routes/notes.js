const Router = require("express")
const router = Router()

router.get('/notes', async (req,res)=>{
    res.render('notes',{
        pageTitle:'notes',
    })
})

module.exports = router
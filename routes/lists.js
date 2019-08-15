const Router = require('express')
const router = Router()
const TODO = require('../models/list')

router.get('/lists', (req, res)=>{
    res.render('lists', {
        pageTitle: "lists"
    })
})

router.get('/lists/:id', async (req, res)=>{
    try {

        let list
        let lists = await TODO.find({
           _id: req.params.id
        })

        list = lists[0]

    res.render('list', {
        pageTitle: "list",
        list
    })
    } catch (error) {
        const status = !error
        res.json({created: status})
    }
})

router.post('/api/lists', async (req, res)=>{

        const list = await new TODO({
            title: req.body.title,
            text: req.body.text
        })
        

        await list.save((error) => {
            const status = !error
            res.json({created: status})
        })
})


router.put('/api/lists/:id', async (req, res)=>{
    try {
        await TODO.findOneAndUpdate({
            _id: req.params.id
         },
         {
             title: req.body.title,
             text: req.body.text
         }
         )

         res.send(`${req.params.id} list was updated`)
     } catch (error) {
        const status = !error
        res.json({created: status})
     }
     })

router.delete('/api/lists/:id', async (req, res)=>{
    try {
        await TODO.findOneAndDelete({
            _id: req.params.id
         })
         res.send(`${req.params.id} list was deleted`)
     } catch (error) {
        const status = !error
        res.json({created: status})
     }
})


module.exports = router
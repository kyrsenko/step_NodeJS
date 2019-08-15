const Router = require("express")
const router = Router()
const Note = require('../models/note')

router.get('/notes', async (req, res)=>{
    res.render('notes',{
        pageTitle:'notes',
    })
})

router.post('/api/notes', async (req, res) => {
        const note = await new Note({
            title: req.body.title,
            text: req.body.text
        })
        await note.save((error) => {
            const status = !error
            res.json({created: status})
            console.log('created')
        })
})

router.get('/notes/:id', async (req, res) => {
    try {
         let note
         const notes = await Note.find({_id:req.params.id})

        note = notes[0]

        res.render('note', {
        pageTitle: 'note',
        note
        })
    } catch (error) {
        console.log(error)
        res.json({created: status})
        console.log(error)
    }
})

router.delete('/api/notes/:id', async (req, res) => {
    try {
        await Note.findOneAndDelete({
            _id: req.body.id
        })

        res.send(`${req.body.id} note was deleted`)
    } catch (error) {
        const status = !error
        res.json({created: status})

    }
})

router.put('/api/notes/:id', async (req, res) => {
    try {
        await Note.findOneAndUpdate({
            _id: req.params.id,
        }, {
            title: req.body.title,
            text: req.body.text
        })

        res.send(`${req.params.id} note was updated`)
    } catch (error) {
        const status = !error
        res.json({created: status})

    }
})

module.exports = router
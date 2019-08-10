const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')

const config = require('./config.js')
const indexRoutes = require('./routes/index')
const listsRoutes = require('./routes/lists')
const noteRoutes = require('./routes/notes')


const app = express()

app.set('view engine', 'ejs')
app.set("layout extractScripts", true)

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use(expressLayouts)
app.use(indexRoutes)
app.use(listsRoutes)
app.use(noteRoutes);


(async function start() {
    try {
        await mongoose.connect(config.DB, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(config.PORT, () => {
            console.log(`Connected on port ${config.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
})()
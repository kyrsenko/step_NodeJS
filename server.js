const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')

const config = require('./config.js')
const app = express()

app.set('view engine', 'ejs')
app.set("layout extractScripts", true)

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'static')))
app.use(expressLayouts)

app.get('/',(req,res) => {
    res.render('index', {
        pageTitle: 'Main page'
    })
});

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

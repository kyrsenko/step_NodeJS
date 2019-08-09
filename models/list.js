const {
    Schema,
    model
} = require('mongoose')
const schema = new Schema({
    title:String,
    text: [{text:String,
        status:String
    }]
})

module.exports = model('TODO', schema)
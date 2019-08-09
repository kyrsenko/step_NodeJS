const {
    Schema,
    model
} = require ('mongoose')

const schema = new Schema({
    title: String, 
    text: String
})

module.exports = model('Note', schema)
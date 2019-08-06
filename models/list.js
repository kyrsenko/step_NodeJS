const {
    Schema,
    model
} = require('mongoose')
const schema = new Schema({
    text: [String]
})

module.exports = model('TODO', schema)
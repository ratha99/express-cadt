const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    detail: {type: String, required: true}
})

serviceSchema.plugin(mongoosePaginate)
serviceSchema.index({
    name: 'text',
    description: 'text'
})

const ServiceModel = mongoose.model('Services', serviceSchema)

module.exports = ServiceModel
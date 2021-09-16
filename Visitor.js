const mongoose = require('mongoose')

const VisitorSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    id: {
        type:Number,
        required:true,
        unique:true

    }
})

module.exports = mongoose.models.Cart || mongoose.model('Visitor', VisitorSchema)
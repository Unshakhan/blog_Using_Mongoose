const mongoose = require('mongoose');
const topicSchema = new mongoose.Schema({
    name:{
        type : String,
        lowercase : true
    },
    desc: String
})

module.exports = mongoose.model("Topic", topicSchema);
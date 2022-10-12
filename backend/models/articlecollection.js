const mongoose = require("mongoose");

var articleListSchema = mongoose.Schema({
    id : String,
    title : String,
    description : String,
    urlToImage : String,
});

const articleListModel = mongoose.model("articleList", articleListSchema);

module.exports = articleListModel;


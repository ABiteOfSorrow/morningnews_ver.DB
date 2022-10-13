var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var articleListModel = require('../models/articlecollection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Ajouter des articles au MyArticle
router.post('/add-article', async function(req, res, next) {

    let error = [];
    let result = false;
    let alreadyExist = false;

    let userId = req.body.userId;
    let articleTitle = req.body.articleTitle;
    let articleDesc = req.body.articleDesc;
    let articleImg = req.body.articleImg;

    try {
        console.log(req.body)

    let foundArticle = await userModel.findOne({ token: userId }, { articles: { title: articleTitle }});
    let duplicateCheck = foundArticle.articles.find((e) => e.title == articleTitle);

    if (articleTitle == "" || articleDesc == "" || articleImg == "") {
        error.push("Contenus vides");
    } 
    
    if (duplicateCheck === true) {
        error.push("Cet article est déjà existe");
        alreadyExist = true;
    } 

    if (error.length == 0) {
            let newArticle = await userModel.updateOne({ token: userId }, { 
                $addToSet: { 
                    articles: {
                        title: articleTitle,
                        description: articleDesc,
                        urlToImage: articleImg,
                    }}});

    if (newArticle !== undefined && newArticle !== null) { 
            result = true;
            console.log("Article est bien enregistré");
        } else {
            console.log("Article n'est pas enregistré")
        }
            
    } 
    return res.json({result, alreadyExist, error});

    } catch (err) {
        console.log(err);
        return res.json({ result: false, error: JSON.stringify(err) });
    } 
})


// // Ajouter des articles au API -> DB (option pour contenus)
//     router.post('/data-article', async function(req, res, next) {

//     let error = [];
//     let result = false;
//     let alreadyExist = false;

//     let articleId = req.body.articleId;
//     let articleTitle = req.body.articleTitle;
//     let articleDesc = req.body.articleDesc;
//     let articleImg = req.body.articleImg;

//     try {
//         var newArticle = new articleListModel ({
//             id: articleId,
//             title: articleTitle,
//             description: articleDesc,
//             urlToImage: articleImg})

//     var articleListSaved = await newArticle.save()

//     if (articleListSaved) {
//         result = true;
//         console.log("articleList Registered");
//     } else {
//         console.log("articleList n'est pas enregistrer")
//     }

//     }catch (err) {
//     console.log(err);
// }
//     res.json({result, alreadyExist, error});
// })

// ver 2. Chargement des articleList avec source (avec DB)
router.post('/get-articleList', async function(req, res, next) {

    let error = [];
    let result = false;

    let articleId = req.body.articleId;
    console.log(articleId)

    try {
        let foundArticleList = await articleListModel.find({ id: articleId});
        console.log(foundArticleList)
        return res.json({result: true, articleList: foundArticleList})
    }
    catch (err) {
        return res.json({ result: false, error: JSON.stringify(err) })
    }
})

// ver 2. Chargement des article (avec DB)
router.post('/get-article', async function(req, res, next) {

    let error = [];
    let result = false;

    let userId = req.body.userId;

    try {
        let foundUser = await userModel.findOne({ token: userId});
        let foundArticle = foundUser.articles
        return res.json({result: true, myArticles: foundArticle})
    }
    catch (err) {
        return res.json({ result: false, error: JSON.stringify(err) })
    }
})

// Supprimer un article && Chargement des article (avec DB)
router.post('/delete-article', async function(req, res, next) {

    let error = [];
    let result = false;

    let userId = req.body.userId;
    let articleTitle = req.body.articleTitle;

    try {
        let deleteArticle = await userModel.update({ token: userId }, {$pull: { articles: { title: articleTitle }}},{
            multi: true})
        let foundUser = await userModel.findOne({ token: userId});
        let foundArticle = foundUser.articles

        return res.json({result: true, myArticles: foundArticle, deleteArticle: deleteArticle})
    }
    catch (err) {
        return res.json({ result: false, error: JSON.stringify(err) })
    }
})

module.exports = router;

import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'

// Pour utiliser API
// const API_KET = process.env.REACT_APP_NEWS_API_KEY


const { Meta } = Card;


function ScreenArticlesBySource(props) {


    var { id } = useParams()

    const [userId, setUserId] = useState("");
    const [articleList, setArticleList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articledesc, setArticleDesc] = useState("");
    const [articleImg, setArticleImg] = useState("");
    const [articleId, setArticleId] = useState("");

    // Ajouter des articles au MyArticle
    let handleLike = (article) => {
        // console.log(props)
        console.log(article)
        setUserId(props.user)
        setArticleTitle(article.title);
        setArticleDesc(article.description);
        setArticleImg(article.urlToImage);
        props.addToWishList(article);
        setArticleId(article.source.id)
    }

    // Controleur Modal
    const showModal = (title, description) => {
        setIsModalVisible(true);
        setModalTitle(title);
        setModalDescription(description);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

   
    // // Chargement des articles (API) option 1
    // useEffect(() => {
    //     async function loadArticles(){
    //         let rawResponse = await fetch(
    //             `https://newsapi.org/v2/top-headlines?sources=${id}&language=fr&sortBy=popularity&apiKey=${API_KET}`
    //         )
    //         let response = await rawResponse.json();
    //         setArticleList(response.articles);
    //         console.log(response.articles)
    //         //console.log("test", response)
    //         //console.log(articleList)
    //     }
    //     loadArticles();
    // }, []);

    // Chargement des articles (DB) option 2
    useEffect(() => {
        let RechargeArticles = async () => {
            const data = await fetch("/get-articleList", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded"},
                body: `articleId=${id}`,
            });
    
            const articleData = await data.json();
            console.log(articleData.articleList)
         if (articleData) {   
            console.log("Article est bien chargé")
            setArticleList(articleData.articleList)
        } else if (articleData.length == 0) {
            console.log("Il n'a pas d'article a charger")
        }
        }
        RechargeArticles();
    }, []);

    // Ajouter des articles
    useEffect(() => {
        async function addArticles(){

            let data = await fetch("/add-article", {
                method: "post",
                headers: { "Content-Type": "application/x-www-form-urlencoded"},
                body: `userId=${userId}&articleTitle=${articleTitle}&articleDesc=${articledesc}&articleImg=${articleImg}`,
            });
    
            let articleData = await data.json();
    
            if (articleData === true){
                console.log("Article est bien enregistré")
            }
        }
        addArticles();
    }, [ handleLike ]);


    // // Ajouter des articles pour API -> DB (option pour contenus)
    // useEffect(() => {
    //     async function addArticles(){

    //         let data = await fetch("/data-article", {
    //             method: "post",
    //             headers: { "Content-Type": "application/x-www-form-urlencoded"},
    //             body: `articleId=${articleId}&articleTitle=${articleTitle}&articleDesc=${articledesc}&articleImg=${articleImg}`,
    //         });
    
    //         let articleData = await data.json();
    
    //         if (articleData === true){
    //             console.log("Article est bien enregistré")
    //         }
    //     }
    //     addArticles();
    // }, [ handleLike ]);


  return (
    <div>
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
                {articleList.map((article, i) => (
                    
                
              <div key={i} style={{display:'flex',justifyContent:'center'}}>

                <Card
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={<img alt="example" src={article.urlToImage}/>}
                  actions={[<Icon onClick={() => showModal(article.title, article.description)} type="read" key="ellipsis2" />, 
                            <Icon onClick={() => handleLike(article)} type="like" key="ellipsis"/>
                            ]}>
                  <Meta title={article.title} description={article.description}/>
                </Card>

                <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>{modalDescription}</p>
                </Modal>
              </div>
    ))}            
           </div>
            
      </div>
  );
}

function mapStateToProps (state) {
    return { user: state.user}
}   

function mapDispatchToProps (dispatch) {
    return {
        addToWishList: function(article) {
          dispatch( {type: 'ADD_ARTICLE', article} );
      },
    };
   };

export default connect(mapStateToProps, mapDispatchToProps)(ScreenArticlesBySource);

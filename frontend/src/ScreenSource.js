import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'

// Pour utiliser API
// const API_KET = process.env.REACT_APP_NEWS_API_KEY

function ScreenSource(props) {

    const [sourceList, setSourceList] = useState([]);

    // using API option 1
    // useEffect(() => {
    //     async function loadData() {
    //         let rawResponse = await fetch(
    //             `https://newsapi.org/v2/top-headlines/sources?country=fr&language=fr&apiKey=${API_KET}`
    //         );
    //         let response = await rawResponse.json();
    //         setSourceList(response.sources)
    //     }
    //     loadData();
    // }, [])
    // // console.log(props)
    // console.log(sourceList)

    // using DB option 2
    let source = [
        {
            "id": "google-news-fr",
            "name": "Google News (France)",
            "description": "Informations complètes et à jour, compilées par Google Actualités à partir de sources d&#39;actualités du monde entier.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "fr",
            "country": "fr"
        },
        {
            "id": "le-monde",
            "name": "Le Monde",
            "description": "Les articles du journal et toute l'actualit&eacute; en continu : International, France, Soci&eacute;t&eacute;, Economie, Culture, Environnement, Blogs ...",
            "url": "http://www.lemonde.fr",
            "category": "general",
            "language": "fr",
            "country": "fr"
        },
        {
            "id": "lequipe",
            "name": "L'equipe",
            "description": "Le sport en direct sur L'EQUIPE.fr. Les informations, résultats et classements de tous les sports. Directs commentés, images et vidéos à regarder et à partager !",
            "url": "https://www.lequipe.fr",
            "category": "sports",
            "language": "fr",
            "country": "fr"
        },
        {
            "id": "les-echos",
            "name": "Les Echos",
            "description": "Toute l'actualité économique, financière et boursière française et internationale sur Les Echos.fr",
            "url": "https://www.lesechos.fr",
            "category": "business",
            "language": "fr",
            "country": "fr"
        },
        {
            "id": "liberation",
            "name": "Libération",
            "description": "Toute l'actualité en direct - photos et vidéos avec Libération",
            "url": "http://www.liberation.fr",
            "category": "general",
            "language": "fr",
            "country": "fr"
        }
    ]
    
useEffect(() => {
    setSourceList(source)
    }, [])
    
  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to={`/ScreenArticlesBySource/${item.id}`}>{item.name} </Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />

          </div>
                 
      </div>
  );
}

function mapStateToProps (state) {
    return { user: state.user}
}

export default connect(mapStateToProps, null)(ScreenSource);


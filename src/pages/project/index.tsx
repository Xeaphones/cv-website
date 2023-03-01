import { useState } from 'react'
import { useCookies } from 'react-cookie'
import Header from '../../components/header';

import './project.scss';

const Projects = () => {
  const [cookies,setCookie] = useCookies(['theme','lang'])
  const [theme, setTheme] = useState(cookies.theme ? cookies.theme : "dark");
  const [lang, setLang] = useState(cookies.lang ? cookies.lang : "fr")
  const changeTheme = () => {
    if (theme === "light") {
      setCookie("theme","dark")
      setTheme("dark")
    } else {
      setCookie("theme","light")
      setTheme("light")
    }
  };

  const changeLang = () => {if (lang === "fr") {
      setCookie("lang","en")
      setLang("en");
      document.documentElement.lang = "en";
    } else { 
      setCookie("lang","fr")
      setLang("fr");
      document.documentElement.lang = "fr";
    }
  }

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="Projects" theme={theme} lang={lang} changeTheme={changeTheme} changeLang={changeLang}/>
      <section className='experience-section'>
        <h2>Experience</h2>
        <div className="timeline">
          <div className="container left">
            <div className="content">
              <h4>{lang == "fr" ? "Depuis Mai" : "Since May"} 2022</h4>
              <h4 className='title'>{lang == "fr" ? "Developpeur Web Fullstack" : "Fullstack Web Dev"}</h4>
              <div className='Text'>
                <p>Veltech, Toulouse</p>
                <p>{lang == "fr" ? 
                "Veltech est une entreprise d'hebergement et de developpement web. Elle crée notamment des sites vitrines ou plus complexes pour des particuliers ou des entreprises."
                : 
                "Veltech is an web development and hosting company. They usually create showcase sites for individuals or more complex one for compagnies."}</p>
                <ul>
                  <li>{lang == "fr" ? "Developpement Front-End en ReactTS" : "Front-End development using ReactTS"}</li>
                  <li>{lang == "fr" ? "Developpement d'API (Mongoose,Express/NodeJS)" : "Api development (Mongoose,Express/NodeJS)"}</li>
                  <li>{lang == "fr" ? "Developpement Back-End" : "Back-End Development"}</li>
                  <li>{lang == "fr" ? "Gestion de base de donnée MongoDB" : "MongoDB databases management"}</li>
                  <li>{lang == "fr" ? "Gestion d'espace utilisateur (Drive)" : "Users' spaces management (drive)"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container right">
            <div className="content">
              <h4>2021-2022</h4>
              <h4 className='title'>{lang == "fr" ? "Projet D'étude: Développeur Jeux Vidéos" : "Study Project: Game Programmer"}</h4>
              <div className='Text'>
                <p className='left'>Campus Ynov Toulouse</p>
                <p>{lang == "fr" ? 
                "Jeu Vidéo en VR crée sur le Moteur Unity3D. Le jeu est un escape game virtuel dans lequel le joueur se retrouve transporté dans plusieurs époques différentes."
                : 
                "VR Video Game created using the Unity3D Engine. The game is a virtual escape game where the player see himself teleported to different era"}</p>
                <ul>
                  <li>{lang == "fr" ? "Création d'un système de déplacement et d'intéraction en VR à l'aide de la librairie SteamVR" : "Creation of a moving and interaction system using SteamVR library"}</li>
                  <li>{lang == "fr" ? "Création de niveaux sur Unity3D" : "Level Creation using Unity3D"}</li>
                  <li>{lang == "fr" ? "Système de menu et de sauvegarde/accès aux niveaux" : "Creation of a menu & level Save/Load system"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container left">
            <div className="content">
              <h4>2018-2019</h4>
              <h4 className='title'>{lang == "fr" ? "Développeur d'Application" : "App Developper"}</h4>
              <div className='Text'>
                <p>Veltech, Toulouse</p>
                <p>{lang == "fr" ? 
                "Application mobile pour permettre de lister les différents événements de type soirée,boite de nuit.. Le but était de fidéliser le client et de lui permettre de rencontrer des personnes proches de lui tel un radar afin ensuite, de pouvoir partager (photos,messages..)"
                : 
                "Mobile application that list multiples type of event like party,nightclub... the goal was to build customer loyalty and to allow them to meet people close to his radius with the help of a radar and lastly to create a small social media to share (photos,messages,...)"}</p>
                <ul>
                  <li>{lang == "fr" ? "Cahier des charges" : "Specifications"}</li>
                  <li>{lang == "fr" ? "Utilisation de l'API Google Map et Geocoding" : "Usage of Google Map & Geocoding API"}</li>
                  <li>{lang == "fr" ? "Developpement Front-End React-Native" : "Front-End Development using React-Native"}</li>
                  <li>{lang == "fr" ? "Developpement Back-End (Mongoose,Axios,Express/NodeJS)" : "Back-End Development using Mongoose,Axios,Express/NodeJS"}</li>
                  <li>{lang == "fr" ? "Utilisation de MongoDB" : "Usage of MongoDB Database"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container right">
            <div className="content">
              <h4>{lang == "fr" ? "Juin" : "June"} 2016</h4>
              <h4 className='title'>{lang == "fr" ? "Stage d'observation: Développeur d'application" : "Observation Internship: Application Dev"}</h4>
              <div className='Text'>
                <p className='left'>Veltech, Toulouse</p>
                <ul>
                  <li>{lang == "fr" ? "Debogage de logiciel et rapport d'erreur" : "Application debug and error log"}</li>
                  <li>{lang == "fr" ? "Aide à la programmation" : "Help in programing"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr></hr>
      {/* <section>
        <h2>{lang === "fr" ? "Projet" : "Project"}</h2>
      </section> */}
    </div>
  )
}

export default Projects

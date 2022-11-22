import { useState } from 'react'
import Header from '../../components/header';

import './project.scss';

const Projects = () => {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("fr")
  const changeTheme = () => {
    if (theme === "light") {
        setTheme("dark");
    } else {
        setTheme("light");
    }
  }

  const changeLang = () => {
    if (lang === "fr") {
      setLang("en");
      document.documentElement.lang = "en";
    } else { 
      setLang("fr");
      document.documentElement.lang = "fr";
    }
  }

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="Projects" theme={theme} lang={lang} changeTheme={changeTheme} changeLang={changeLang}/>
      <section className='experience-section'>
        <h2>Experience</h2>
        <div className='vertical-line' style={{marginBottom: ""}}>
            <div className='diamond' style={{top: "0.5%"}}></div>
            <div className='diamond' style={{top: "28%"}}></div>
            <div className='diamond' style={{top: "54%"}}></div>
            <div className='diamond' style={{top: "87%"}}></div>
          </div>
          <div className='container'>
            <div className='box'>
              <div className='header'>
                <p className='date'>{lang == "fr" ? "Depuis Mai" : "Since May"} 2022</p>
                <h4 className='title'>{lang == "fr" ? "Developpeur Web Fullstack" : "Fullstack Web Dev"}</h4>
              </div>
              <div className='content'>
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
            <div className='box right'>
              <div className='header'>
                <h4 className='title'>{lang == "fr" ? "Projet D'étude: Développeur Jeux Vidéos" : "Study Project: Game Programmer"}</h4>
                <p className='date'>2021-2022</p>
              </div>
              <div className='content'>
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
            <div className='box'>
              <div className='header'>
                <p className='date'>2018-2019</p>
                <h4 className='title'>{lang == "fr" ? "Développeur d'Application" : "App Developper"}</h4>
              </div>
              <div className='content'>
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
            <div className='box right'>
              <div className='header'>
                <h4 className='title'>{lang == "fr" ? "Stage d'observation: Développeur d'application" : "Observation Internship: Application Dev"}</h4>
                <p className='date'>{lang == "fr" ? "Juin" : "June"} 2016</p>
              </div>
              <div className='content'>
                <p className='left'>Veltech, Toulouse</p>
                <ul>
                  <li>{lang == "fr" ? "Debogage de logiciel et rapport d'erreur" : "Application debug and error log"}</li>
                  <li>{lang == "fr" ? "Aide à la programmation" : "Help in programing"}</li>
                </ul>
              </div>
            </div>
          </div>
      </section>
      <hr></hr>
      <section>
        <h2>{lang === "fr" ? "Projet" : "Project"}</h2>
      </section>
    </div>
  )
}

export default Projects

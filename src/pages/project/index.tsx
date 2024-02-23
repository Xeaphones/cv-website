import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useTheme, useLang,useSwitch } from '../../assets/script/switch'
import Header from '../../components/header';
import ScrollUpButton from '../../components/scrollupButton';
import ProjectComponent from '../../components/projectComponent';

// Project element import

import carnetSportifThumbnail from "../../assets/img/carnetsportif_thumbnail.png";
import { ReactTSX, Go, Figma } from '../../assets/svg';

//

import './project.scss';

const Projects = () => {
  const [theme, setTheme, lang, setLang] = useSwitch();

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="Projects" theme={theme} lang={lang} changeTheme={setTheme} changeLang={setLang}/>
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
      <section className='project-section'>
        <h2>{lang === "fr" ? "Projet" : "Project"}</h2>
        <div className="project-container">
          <ProjectComponent
            title="CarnetSportif"
            label="Stage 2023"
            description={lang === "fr" ? "Migration et remise à niveau du site web CarnetSportif, un site web spécialisé dans le suivi sportif spécialisé entre coach et leurs sportifs. Ce stage a été pour moi l’occasion de confirmer mes compétences web, notamment l’utilisation de ReactTS, Go et Figma, et de pouvoir travailler en équipe avec l’association d’un développeur Backend et d’un designer UI/UX." : "EN"}
            image={carnetSportifThumbnail}
            link="https://carnetsportif.com/"
            icon={[<ReactTSX/>,<Go/>,<Figma/>]}
            element={["Migration de l’ancien site web en ReactTS afin d’avoir un rendu plus dynamique du site web, permettant d’avoir une expérience personnalisée pour les coachs et leurs sportifs.","Utilisation de Figma en association avec un designer UI/UX afin de remettre à neuf l’identité du site et de le rendre plus accessible pour n’importe quel utilisateur; Figma permettant un intégration simplifiée du côté frontend grâce à une maquette réalisée à l’avance.","Utilisation d’un backend en Go, servant de serveur d’API, servant les données sur les utilisateurs afin d’avoir des informations tels que leurs séances, leurs records ou autres."]}
            conclusion={lang === "fr" ? "Mon stage pour la migration du site web CarnetSportif a été une expérience très enrichissante. Premièrement j’ai pu confirmer les connaissances que j’avais acquis de manière autonome lors de projet personnel, mais aussi en découvrir plus sur les librairies de ReactTS et NodeJS. J’ai aussi pu travailler en équipe dans un cadre professionnel avec des attentes à répondre auprès d’un client. Je tiens aussi à remercier toute l’équipe avec laquelle j’ai travaillé mais aussi mon maître de stage pour cette expérience plus qu’enrichissante." : "EN"}
          />
        </div>
      </section>
      <ScrollUpButton min={0}/>
    </div>
  )
}

export default Projects

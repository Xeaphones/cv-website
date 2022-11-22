import { useState,useRef } from 'react';

import Header from '../../components/header';
import SkillBar from '../../components/skillBar';
import InterestContainer from '../../components/interestContainer';
import { ArrowUp,ArrowDown,PDF,Controller,Note, Data, Clapperboard, CherryFlower } from '../../assets/svg';

import './more.scss';

const More = () => {
  const web = useRef<HTMLDivElement>(null);
  const [webState,setWebState] = useState(false);
  const environnement = useRef<HTMLDivElement>(null);
  const [environnementState,setEnvironnementState] = useState(false);
  const application = useRef<HTMLDivElement>(null);
  const [applicationState,setApplicationState] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("fr")
  const changeTheme = () => theme === "light" ? setTheme("dark") : setTheme("light");

  const switchState = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      if (ref.current.style.display === "none") {
        ref.current.style.display = "flex";
      } else {
        ref.current.style.display = "none";
      }
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
      <Header currentRoute="More" theme={theme} lang={lang} changeTheme={changeTheme} changeLang={changeLang}/>
      <section className='skill-section'>
        <div id='skills' className='title'>
          <h2>{lang === "fr" ? "Mes compétences" : "Technical skills"}</h2>
          <div className='titleSection'>
            <h3>Web</h3>
            {webState !== false ? 
            <ArrowDown fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(web); setWebState(!webState)}}/> 
            : 
            <ArrowUp fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(web); setWebState(!webState)}}/>}
          </div>
          <div ref={web} className='container'>
            <SkillBar name="HTML/CSS/JS" percent="100%" color="green" theme={theme}/>
            <SkillBar name="Typescript" percent="80%" color="#188c9f" theme={theme}/>
            <SkillBar name="React" percent="90%" color="#188c9f" theme={theme}/>
            <SkillBar name="NodeJS" percent="96%" color="#188c9f" theme={theme}/>
            <SkillBar name="PHP" percent="60%" color="orange" theme={theme}/>
            <SkillBar name="Wordpress" percent="50%" color="orange" theme={theme}/>
          </div>
          <div className='titleSection'>
            <h3>Environnement</h3>
            {environnementState !== false ? 
            <ArrowDown fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(environnement); setEnvironnementState(!environnementState)}}/> 
            : 
            <ArrowUp fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(environnement); setEnvironnementState(!environnementState)}}/>}
          </div>
          <div ref={environnement} className='container'>
            <SkillBar name="Windows" percent="70%" color="#188c9f" theme={theme}/>
            <SkillBar name="Windows Server" percent="70%" color="#188c9f" theme={theme}/>
            <SkillBar name="Linux" percent="90%" color="#188c9f" theme={theme}/>
            <SkillBar name="VMWare" percent="86%" color="#188c9f" theme={theme}/>
            <SkillBar name="Docker" percent="40%" color="orange" theme={theme}/>
            <SkillBar name="Git" percent="100%" color="green" theme={theme}/>
          </div>
          <div className='titleSection'>
            <h3>Applications</h3>
            {applicationState !== false ? 
            <ArrowDown fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(application); setApplicationState(!applicationState)}}/> 
            : 
            <ArrowUp fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(application); setApplicationState(!applicationState)}}/>}
          </div>
          <div ref={application} className='container'>
            <SkillBar name="Python" percent="100%" color="green" theme={theme}/>
            <SkillBar name="Unity & C#" percent="88%" color="#188c9f" theme={theme}/>
            <SkillBar name="Unreal Engine & C++" percent="60%" color="orange" theme={theme}/>
          </div>
        </div>
      </section>
      <br></br>
      <hr></hr>
      {/* <section className='soft-section'>
        <h2>Soft Skills</h2>
      </section>
      <br></br>
      <hr></hr> */}
      <section className='formation-section'>
        <h2>{lang === "fr" ? "Mes Formations" : "Education"}</h2>
        <div>
          <div className='vertical-line' style={{marginBottom: ""}}>
            <div className='diamond' style={{top: "6%"}}></div>
            <div className='diamond' style={{top: "40%"}}></div>
            <div className='diamond' style={{top: "74%"}}></div>
          </div>
          <div className='container'>
            <div className='box'>
              <div className='header'>
                <p className='date'>2022-{lang == "fr" ? "Maintenant" : "Now"}</p>
                <h4 className='title'>Bachelor 2 Informatique (Bac+2)</h4>
              </div>
              <div className='content'>
                <p>Campus Ynov Toulouse</p>
                <ul>
                  <li>{lang == "fr" ? "Gestion & Utilisation de Windows Server" : "Usage & Management of Windows Server"}</li>
                  <li>{lang == "fr" ? "Création de plugin Wordpress (PHP)" : "Wordpress plugin creation (PHP)"}</li>
                  <li>{lang == "fr" ? "Création de site web en utilisant ReactTS" : "Website creation using ReactTS"}</li>
                  <li>{lang == "fr" ? "Utilisation & Masterisation de Linux" : "Linux Usage & Masterisation"}</li>
                </ul>
              </div>
            </div>
            <div className='box right'>
              <div className='header'>
                <h4 className='title'>Bachelor 1 Informatique (Bac+1)</h4>
                <p className='date'>2021-2022</p>
              </div>
              <div className='content'>
                <p className='left'>Campus Ynov Toulouse</p>
                <ul>
                  <li>{lang == "fr" ? "Création de serveur web (Go et NodeJS/Express)" : "Web Server creation (Go and NodeJS/Express)"}</li>
                  <li>{lang == "fr" ? "Création de site web (HTML/CSS/JS)" : "Website creation (HTML/CSS/JS)"}</li>
                  <li>{lang == "fr" ? "Création de jeu vidéo (Moteur Unity)" : "Game Creation (Unity Engine)"}</li>
                  <li>{lang == "fr" ? "Création et utilisation d'une API REST" : "Usage and creation of an REST API"}</li>
                </ul>
              </div>
            </div>
            <div className='box'>
              <div className='header'>
                <p className='date'>2020-2021</p>
                <h4 className='title'>{lang == "fr" ? "Baccalauréat Général" : "General Baccalaureate"}</h4>
              </div>
              <div className='content'>
                <p>Emilie de rodat, Toulouse</p>
                <ul>
                  <li>{lang == "fr" ? "Mention Bien" : "Good Honors"}</li>
                  <li>{lang == "fr" ? "Spécialité Physique-Chimie & NSI" : "Physics, Chemistry & NSI Specialty"}</li>
                  <li>{lang == "fr" ? "Option Mathématiques Complémentaire" : "Complementary Mathematics Option"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr></hr>
      <section className='interest-section'>
        <h2>{lang === "fr" ? "Mes Interêts" : "Interests"}</h2>
        <div className='interests'>
          <InterestContainer title={lang === "fr" ? "Jeux Vidéos" : "Gaming"} icon={<Controller/>} theme={theme}/>
          <InterestContainer title={lang === "fr" ? "Musique" : "Music"} icon={<Note/>} theme={theme}/>
          <InterestContainer title={lang === "fr" ? "Informatique" : "Computing"} icon={<Data/>} theme={theme}/>
          <InterestContainer title={lang === "fr" ? "Film & Serie" : "Movie & Serie"} icon={<Clapperboard/>} theme={theme}/>
          <InterestContainer title={lang === "fr" ? "Culture Japonaise" : "Japanese Culture"} icon={<CherryFlower/>} theme={theme}/>
        </div>
      </section>
      <hr></hr>
      <section className='download-section'>
        <h2>{lang === "fr" ? "Télécharger mon CV" : "Download my CV"}</h2>
        <div>
          <a href='/yohan-velay.pdf' download>
            <PDF width="10%"></PDF>
          </a>
        </div>
      </section>
    </div>
  )
}

export default More
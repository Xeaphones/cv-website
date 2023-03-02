import { useState,useRef,useEffect } from 'react';
import { useCookies } from 'react-cookie';

import Header from '../../components/header';
import SkillBar from '../../components/skillBar';
import InterestContainer from '../../components/interestContainer';
import { ArrowUp,ArrowDown,PDF,Controller,Note, Data, Clapperboard, CherryFlower } from '../../assets/svg';
import {TypeScript,ReactTSX,NodeJS,PHP,Linux,Docker,Git,Python,Unity,UnrealEngine,Wordpress,Web} from '../../assets/svg';


import './more.scss';

const More = () => {
  const web = useRef<HTMLDivElement>(null);
  const [webState,setWebState] = useState(false);
  const environnement = useRef<HTMLDivElement>(null);
  const [environnementState,setEnvironnementState] = useState(false);
  const application = useRef<HTMLDivElement>(null);
  const skills = useRef<null | HTMLDivElement>(null);
  const [applicationState,setApplicationState] = useState(false);
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

  useEffect(() => { 
    if (skills && location.hash.includes('#skills')) { 
      skills?.current?.scrollIntoView({});
    }
  }, [skills, location.hash]);

  const switchState = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      if (ref.current.style.display === "none") {
        ref.current.style.display = "flex";
      } else {
        ref.current.style.display = "none";
      }
    }
  }

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="More" theme={theme} lang={lang} changeTheme={changeTheme} changeLang={changeLang}/>
      <section ref={skills} className='skill-section'>
        <div className='title'>
          <h2>{lang === "fr" ? "Mes compétences" : "Technical skills"}</h2>
          <div className='titleSection'>
            <h4>Web</h4>
            {webState !== false ? 
            <ArrowDown fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(web); setWebState(!webState)}}/> 
            : 
            <ArrowUp fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(web); setWebState(!webState)}}/>}
          </div>
          <div ref={web} className='container'>
            <SkillBar name="HTML/CSS/JS" percent="100%" color="green" icon={<Web fill={theme === "light" ? "#222C37" : "whitesmoke"}/>} theme={theme}/>
            <SkillBar name="Typescript" percent="80%" color="#188c9f" icon={<TypeScript />} theme={theme}/>
            <SkillBar name="React" percent="90%" color="#188c9f" icon={<ReactTSX/>} theme={theme}/>
            <SkillBar name="NodeJS" percent="96%" color="#188c9f" icon={<NodeJS/>} theme={theme}/>
            <SkillBar name="PHP" percent="60%" color="orange" icon={<PHP fill={theme === "light" ? "black" : "whitesmoke"}/>} theme={theme}/>
            <SkillBar name="Wordpress" percent="50%" color="orange" icon={<Wordpress/>} theme={theme}/>
          </div>
          <div className='titleSection'>
            <h4>Environnement</h4>
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
            <SkillBar name="Docker" percent="40%" color="orange" icon={<Docker/>} theme={theme}/>
            <SkillBar name="Git" percent="100%" color="green" icon={<Git/>} theme={theme}/>
          </div>
          <div className='titleSection'>
            <h4>Applications</h4>
            {applicationState !== false ? 
            <ArrowDown fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(application); setApplicationState(!applicationState)}}/> 
            : 
            <ArrowUp fill={theme === "light" ? "" : "white"} cursor="pointer" onClick={() => {switchState(application); setApplicationState(!applicationState)}}/>}
          </div>
          <div ref={application} className='container'>
            <SkillBar name="Python" percent="100%" color="green" icon={<Python/>} theme={theme}/>
            <SkillBar name="Unity & C#" percent="75%" color="#188c9f" icon={<Unity fill={theme === "light" ? "#222C37" : "whitesmoke"}/>} theme={theme}/>
            <SkillBar name="Unreal Engine & C++" percent="40%" color="orange" icon={<UnrealEngine fill={theme === "light" ? "#222C37" : "whitesmoke"}/>} theme={theme}/>
          </div>
        </div>
      </section>
      <br></br>
      <hr></hr>
      {/* <section className='soft-section'>
        <h3>Soft Skills</h3>
      </section>
      <br></br>
      <hr></hr> */}
      <section className='formation-section'>
        <h2>{lang === "fr" ? "Mes Formations" : "Education"}</h2>
        <div className="timeline">
          <div className="container left">
            <div className="content">
              <h4>2022-{lang == "fr" ? "Maintenant" : "Now"}</h4>
              <h4 className='title'>Bachelor 2 Informatique (Bac+2)</h4>
              <div className='Text'>
                <p>Campus Ynov Toulouse</p>
                <ul>
                  <li>{lang == "fr" ? "Gestion & Utilisation de Windows Server" : "Usage & Management of Windows Server"}</li>
                  <li>{lang == "fr" ? "Création de plugin Wordpress (PHP)" : "Wordpress plugin creation (PHP)"}</li>
                  <li>{lang == "fr" ? "Création de site web en utilisant ReactTS" : "Website creation using ReactTS"}</li>
                  <li>{lang == "fr" ? "Utilisation & Masterisation de Linux" : "Linux Usage & Masterisation"}</li>
                  <li>{lang == "fr" ? "Utilisation et création de base de données SQL" : "SQL based BDD Usage & Création"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container right">
            <div className="content">
              <h4>2021-2022</h4>
              <h4 className='title'>Bachelor 1 Informatique (Bac+1)</h4>
              <div className='Text'>
                <p className='left'>Campus Ynov Toulouse</p>
                <ul>
                  <li>{lang == "fr" ? "Création de serveur web (Go et NodeJS/Express)" : "Web Server creation (Go and NodeJS/Express)"}</li>
                  <li>{lang == "fr" ? "Création de site web (HTML/CSS/JS)" : "Website creation (HTML/CSS/JS)"}</li>
                  <li>{lang == "fr" ? "Création de jeu vidéo (Moteur Unity)" : "Game Creation (Unity Engine)"}</li>
                  <li>{lang == "fr" ? "Création et utilisation d'une API REST" : "Usage and creation of an REST API"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container left">
            <div className="content">
              <h4>2020-2021</h4>
              <h4 className='title'>{lang == "fr" ? "Baccalauréat Général" : "General Baccalaureate"}</h4>
              <div className='Text'>
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
        <h3>{lang === "fr" ? "Mes Interêts" : "Interests"}</h3>
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
        <h3>{lang === "fr" ? "Télécharger mon CV" : "Download my CV"}</h3>
        <div>
          <a href='/yohan-velay.pdf' download>
            <PDF></PDF>
          </a>
        </div>
      </section>
    </div>
  )
}

export default More
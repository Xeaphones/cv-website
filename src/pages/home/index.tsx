import { useState } from 'react';

import Header from '../../components/header';
import Card from '../../components/card';
import SkillContainer from '../../components/skillContainer';

import codeWhiteIMG from "../../assets/img/code_white_128.png";
import gameDevWhiteIMG from "../../assets/img/game-dev_white_128.png";
import apiWhiteIMG from "../../assets/img/api_white_128.png";
import codeBlackIMG from "../../assets/img/code_black_128.png";
import gameDevBlackIMG from "../../assets/img/game-dev_black_128.png";
import apiBlackIMG from "../../assets/img/api_black_128.png";

import { 
  JavaScript,
  Python,
  TypeScript,
  NodeJS,
  ReactTSX,
  Go,
  Html5,
  Css,
  Scss,
  Git,
  NPM,
  Docker,
  Cpp,
  Linux,
  MongoDB,
  Vite,
  VsCode,
  Heroku,
  Trello,
  Unity,
  VsStudio,
  UnrealEngine} from '../../assets/svg';

import './home.scss';

const Home = () => {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("fr")
  const changeTheme = () => theme === "light" ? setTheme("dark") : setTheme("light");

  const changeLang = () => {if (lang === "fr") {
      setLang("en");
      document.documentElement.lang = "en";
    } else { 
      setLang("fr");
      document.documentElement.lang = "fr";
    }
  }

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="Home" theme={theme} lang={lang} changeTheme={changeTheme} changeLang={changeLang}/>
      <section className='aboutme-section'>
        <div className='title'>
          <h2>{lang === "fr" ? "Mon Profil" : "About Me"}</h2>
          <div className='informations'>
            <p>19 {lang === "fr" ? "Ans" : "Years"}</p>
            <span>/</span>
            <p>Toulouse</p>
            <span>/</span>
            <p>{lang === "fr" ? "Etudiant" : "Student"}</p>
          </div>
          <div className='bio'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, doloribus totam temporibus vitae in id necessitatibus soluta aliquam consequatur voluptate, perferendis accusamus ratione quod nemo voluptas facere tempora quia voluptatibus voluptatum! Aut consequuntur laborum ea molestias beatae quis, impedit assumenda cupiditate, alias earum ducimus ratione sapiente est accusantium quam aliquid.</p>
          </div>
        </div>
        <div className='contacts'>
          <a href='/#/contact'>Yohan2003@free.fr</a>
          <span>/</span>
          <p>07 81 07 21 78</p>
        </div>
      </section>
      <hr/>
      <section className='wicd-section'>
        <div className='title'>
          <h2>{lang === "fr" ? "Mes Services" : "My Services"}</h2>
        </div>
        <div className='container'>
            <Card title={lang === "fr" ? "Développement Web" : "Web Development"}
            content={lang === "fr" ? "Je peux crée des sites statique ou dynamique.\n Back-end en Node.JS/Express ou Go.\n En utilisant React comme Framework." : "I can build static or dynamic website.\n Back-end in Node.JS/Express or Go.\n Using react as Framework."}
            imgSRC={(theme === "light" ? codeBlackIMG : codeWhiteIMG)} 
            imgALT='Web Development icon'
            theme={theme}/>
            <Card title={lang === "fr" ? "Développement API" : "API Development"} content={lang === "fr" ? "En utilisant Node.JS/Express je suis capable de developper une API protégée à l'aide de Token." : "With the use of Node.JS/Express I'm able to develop an Token protected API."} imgSRC={(theme === "light" ? apiBlackIMG : apiWhiteIMG)} imgALT='API Icon' theme={theme}/>
            <Card title={lang === "fr" ? "Développement Jeux-vidéos" : "Game Development"} content={lang === "fr" ? "Je sais développer de petit jeux en utilisant Unity ou Unreal Engine.\n 2D ou 3D." : "I know how to create small games using Unity or Unreal Engine.\n 2D Games or 3D games."} imgSRC={(theme === "light" ? gameDevBlackIMG : gameDevWhiteIMG)} imgALT='Game Development icon' theme={theme}/>
          </div>
      </section>
      <hr/>
      <section className='skills-section'>
        <div className='title'>
          <h2>{lang === "fr" ? "Mes Compétences" : "My Skills"}</h2>
        </div>
        <div className='container'>
          <SkillContainer name='React' content='bla bla bla bla bla bla bla bla bla' icon={<ReactTSX />} theme={theme}/>
          <SkillContainer name='Javascript' content='bla bla bla bla bla bla bla bla bla' icon={<JavaScript />} theme={theme}/>
          <SkillContainer name='Python' content='bla bla bla bla bla bla bla bla bla' icon={<Python />} theme={theme}/>
          <SkillContainer name='' content='' icon={<TypeScript />} theme={theme}/>
          <SkillContainer name='' content='' icon={<NodeJS />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Html5 />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Css />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Scss />} theme={theme}/>
          <SkillContainer name='' content='' icon={<VsCode />} theme={theme}/>
          <SkillContainer name='' content='' icon={<VsStudio />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Git />} theme={theme}/>
          <SkillContainer name='' content='' icon={<NPM />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Docker />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Heroku />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Trello />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Cpp />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Linux />} theme={theme}/>
          <SkillContainer name='' content='' icon={<MongoDB />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Unity />} theme={theme}/>
          <SkillContainer name='' content='' icon={<UnrealEngine />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Vite />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Go />} theme={theme}/>
        </div>
      </section>
    </div>
  )
}

export default Home
import { useSwitch } from '../../assets/script/switch';

import Header from '../../components/header';
import Card from '../../components/card';
import SkillContainer from '../../components/skillContainer';
import ScrollUpButton from '../../components/scrollupButton';

import codeWhiteIMG from "../../assets/img/code_white_128.png";
import gameDevWhiteIMG from "../../assets/img/game-dev_white_128.png";
import apiWhiteIMG from "../../assets/img/api_white_128.png";
import codeBlackIMG from "../../assets/img/code_black_128.png";
import gameDevBlackIMG from "../../assets/img/game-dev_black_128.png";
import apiBlackIMG from "../../assets/img/api_black_128.png";
import photoOfMoi from "../../assets/img/photoofmoi.jpg";

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
  UnrealEngine,
  PHP,
  BDD,
  Wordpress,
  Figma} from '../../assets/svg';

import './home.scss';

const Home = () => {
  const [theme, setTheme, lang, setLang] = useSwitch();

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="Home" theme={theme} lang={lang} changeTheme={setTheme} changeLang={setLang}/>
      <section className='aboutme-section'>
        <div className='title'>
          <h2>{lang === "fr" ? "Mon Profil" : "About Me"}</h2>
          <div className='infogroup'>
            <img src={photoOfMoi} alt='A photo of me'></img>
            <div className='subgroup'>
              <div className='informations'>
                <p>19 {lang === "fr" ? "Ans" : "Years"}</p>
                <span>/</span>
                <p>Toulouse</p>
                <span>/</span>
                <p>{lang === "fr" ? "Etudiant" : "Student"}</p>
              </div>
              <div className='bio'>
                <p>Venant d'une famille d'informaticiens, j'ai fait du code une de mes passions depuis mes 8 ans en commençant par du scratch puis du python. Féru d'informatique, j’apprends en continu sur le monde du numérique. J'aime beaucoup travailler en équipe pour profiter de la dynamique du groupe et améliorer mes compétences. Je suis passionné de musique, jouant un peu de la guitare durant mon temps libre.</p>
              </div>
              <div className='contacts'>
                <a href='/#/contact'>yohan.velay@free.fr</a>
                <span>/</span>
                <p>07 81 07 21 78</p>
              </div>
            </div>
          </div>  
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
          <h3>{lang === "fr" ? "Mes Compétences" : "My Skills"}</h3>
        </div>
        <div className='container'>
          <SkillContainer name='React' content={lang === "fr" ? "Blibliothèque utilisé lors de création de site web." : "Librarie used when creating a website."} icon={<ReactTSX />} theme={theme}/>
          <SkillContainer name='Javascript' content={lang === "fr" ? "Language principal lors de la création de site web/API (NodeJS et React)" : "Main language when creating website/API (NodeJS and React)"} icon={<JavaScript />} theme={theme}/>
          <SkillContainer name='Unity' content={lang === "fr" ? "Moteur de jeu principal lors de la création de jeux." : "Main game engine when creating games."} icon={<Unity fill={theme === "light" ? "#222C37" : "whitesmoke"}/>} theme={theme}/>
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
          <SkillContainer name='' content='' icon={<Wordpress />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Trello />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Figma />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Cpp />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Linux fill={theme === "light" ? "black" : "whitesmoke"}/>} theme={theme}/>
          <SkillContainer name='' content='' icon={<PHP fill={theme === "light" ? "black" : "whitesmoke"}/>} theme={theme}/>
          <SkillContainer name='' content='' icon={<BDD fill={theme === "light" ? "black" : "whitesmoke"}/>} theme={theme}/>
          <SkillContainer name='' content='' icon={<MongoDB />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Python />} theme={theme}/>
          <SkillContainer name='' content='' icon={<UnrealEngine fill={theme === "light" ? "black" : "whitesmoke"}/>} theme={theme}/>
          <SkillContainer name='' content='' icon={<Vite />} theme={theme}/>
          <SkillContainer name='' content='' icon={<Go />} theme={theme}/>
        </div>
      </section>
      <ScrollUpButton min={100}/>
    </div>
  )
}

export default Home
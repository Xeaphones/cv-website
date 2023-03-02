import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Header from '../../components/header';
import "./404.scss";

const Error404 = () => {
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
      <Header currentRoute="" theme={theme} lang={lang} changeTheme={changeTheme} changeLang={changeLang}/>
      <section className='error404'>
        <div>
          <h1>404</h1>
          <h2>{lang == "fr" ? "Page introuvable" : "Page not found"}</h2>
          <button onClick={() => window.location.href = "/"}>{lang == "fr" ? "Retournez à l'accueil" : "Go back to home"}</button>
        </div>
      </section>
    </div>
  )
}

export default Error404
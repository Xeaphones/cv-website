import { useSwitch } from '../../assets/script/switch';
import Header from '../../components/header';
import "./404.scss";

const Error404 = () => {
  const [theme, setTheme, lang, setLang] = useSwitch();

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="" theme={theme} lang={lang} changeTheme={setTheme} changeLang={setLang}/>
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
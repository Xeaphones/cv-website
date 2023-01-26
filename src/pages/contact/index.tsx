import { useState } from 'react';
import { send } from 'emailjs-com';
import config from '../../../config.json';
import Header from '../../components/header';
import { CrossMarkCricle, CheckMarkCircle, Discord, Linkedin } from '../../assets/svg';

import "./contact.scss"

const Contact = () => {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("fr");
  const [discordPopup,setDiscordPopup] = useState(false);
  const [valid, setValid] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [toSend, setToSend] = useState({
    from_firstname: '',
    from_lastname: '',
    object: '',
    message: '',
    reply_to: '',
  });
  const changeTheme = () => theme === "light" ? setTheme("dark") : setTheme("light");

  const changeLang = () => {if (lang === "fr") {
      setLang("en");
      document.documentElement.lang = "en";
    } else { 
      setLang("fr");
      document.documentElement.lang = "fr";
    }
  }

  const copy = (Link: string) => {
    navigator.clipboard.writeText(Link);
    setDiscordPopup(true);
    setTimeout(() => {
      setDiscordPopup(false);
    },3000)
  }

  const sendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    send(
      config.emailJS.serviceID,
      config.emailJS.templateID,
      toSend,
      config.emailJS.userID
    )
    .then(() => {
      setValid(true);
      setTimeout(() => {
        setValid(false);
      },3000)
    })
    .catch((err) => {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
      },3000)
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="Contact" theme={theme} lang={lang} changeTheme={changeTheme} changeLang={changeLang}/>
      <section className='contacts'>
        <p>E-Mail: Yohan2003@free.fr</p>
        <p>{lang === "fr" ? "Téléphone" : "Phone"}: 07 81 07 21 78</p>
      </section>
      <hr/>
      <section className='social-contacts'>
        <a onClick={() => {copy("Føxy#6578")}} className="discord">
          <i title='Føxy#6578'><Discord/></i>
        </a>
        <a href='https://fr.linkedin.com/in/yohan-velay' title='Yohan Velay'>
          <i><Linkedin/></i>
        </a>
      </section>
      <hr/>
      <section className='email'>
        <form onSubmit={sendMail}>
          <h2>{lang === "fr" ? "Contactez-moi" : "Contact me"}</h2>
          <div className='firstname-input'>
            <input className='input' id="firstname" name='from_firstname' type="text" placeholder=' ' value={toSend.from_firstname} onChange={handleChange} required/>
            <label className='label' htmlFor='firstname'>{lang === "fr" ? "Prenom" : "Firstname"} *</label>
          </div>
          <div className='lastname-input'>
            <input className='input' id="lastname" name='from_lastname' type="text" placeholder=' ' value={toSend.from_lastname} onChange={handleChange} required/>
            <label className='label' htmlFor='lastname'>{lang === "fr" ? "Nom" : "Lastname"} *</label>
          </div>
          <div className='email-input'>
            <input className='input' id="email" name='reply_to' type="email" placeholder=' ' value={toSend.reply_to} onChange={handleChange} required/>
            <label className='label' htmlFor='email'>Email *</label>
          </div>
          <div className='object-input'>
            <input className='input' id="object" name='object' type="text" placeholder=' ' value={toSend.object} onChange={handleChange} required/>
            <label className='label' htmlFor='object'>{lang === "fr" ? "Objet" : "Object"} *</label>
          </div>
          <div className='content-textarea'>
            <textarea className='input' id="content" name='message' placeholder=' ' value={toSend.message} onChange={handleChange} required></textarea>
            <label className='label' htmlFor='content'>{lang === "fr" ? "Contenu" : "Content"} *</label>
          </div>
          <div className='submit-button'>
            <button type='submit'>{lang === "fr" ? "Envoyer" : "Submit"}</button>
          </div>
          <p>{lang === "fr" ? "* Ces champs sont obligatoires." : "* These fields are mandatory."}</p>
        </form>
        <div className={['snackbars', valid || invalid || discordPopup === true ? "show" : ""].join(" ")}>
          <div id="snackbar-valid" className={valid === true ? "show" : ""}>
            <i><CheckMarkCircle/></i>
            <p>{lang === "fr" ? "Email envoyé." : "Email Sent."}</p>
          </div>
          <div id="snackbar-discord" className={discordPopup === true ? "show" : ""}>
            <i><CheckMarkCircle/></i>
            <p>{lang === "fr" ? "Nom d'utilisateur copié." : "Copied username to clipboard."}</p>
          </div>
          <div id="snackbar-invalid" className={invalid === true ? "show" : ""}>
            <i><CrossMarkCricle/></i>
            <p>{lang === "fr" ? "Erreur lors de l'envoie de l'email." : "Error while sending email."}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
import { useState } from 'react';
import { useSwitch } from '../../assets/script/switch';
import { useForm, SubmitHandler } from "react-hook-form";
import { send } from 'emailjs-com';
import config from '../../../config.json';
import Header from '../../components/header';
import { CrossMarkCricle, CheckMarkCircle, Discord, Linkedin,Github } from '../../assets/svg';

import "./contact.scss"

type FormValues = {
  from_firstname: string;
  from_lastname: string;
  object: string;
  phone: string;
  message: string;
  reply_to: string;
};

const Contact = () => {
  const { register, handleSubmit,resetField } = useForm<FormValues>();
  const [discordPopup,setDiscordPopup] = useState(false);
  const [valid, setValid] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [toSend, setToSend] = useState({
    from_firstname: '',
    from_lastname: '',
    object: '',
    phone: '',
    message: '',
    reply_to: '',
  });
  const [theme, setTheme, lang, setLang] = useSwitch();
  const onSubmit: SubmitHandler<FormValues> = data => {
    setToSend(data);
    sendMail();
  }

  const copy = (Link: string) => {
    navigator.clipboard.writeText(Link);
    setDiscordPopup(true);
    setTimeout(() => {
      setDiscordPopup(false);
    },3000)
  }

  const sendMail = () => {
    send(
      config.emailJS.serviceID,
      config.emailJS.templateID,
      toSend,
      config.emailJS.userID
    )
    .then(() => {
      setValid(true);
      resetField('from_firstname');
      resetField('from_lastname');
      resetField('object');
      resetField('message');
      resetField('reply_to');
      resetField('phone')
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

  return (
    <div className={[(theme === "light" ? "AppLight" : ""),"App"].join(" ")}>
      <Header currentRoute="Contact" theme={theme} lang={lang} changeTheme={setTheme} changeLang={setLang}/>
      <section className='contacts'>
        <p>E-Mail: yohan.velay@free.fr</p>
        <p>{lang === "fr" ? "Téléphone" : "Phone"}: 07 81 07 21 78</p>
      </section>
      <hr/>
      <section className='social-contacts'>
        <a onClick={() => {copy("Føxy#6578")}} className="discord">
          <i title='Føxy#6578'><Discord/></i>
        </a>
        <a href='https://fr.linkedin.com/in/yohan-velay' target={'_blank'} title='Yohan Velay'>
          <i><Linkedin/></i>
        </a>
        <a href='https://github.com/Xeaphones' target={'_blank'} title='Xeaphones'>
          <i><Github fill={theme === "light" ? "#222C37" : "whitesmoke"}/></i>
        </a>
      </section>
      <hr/>
      <section className='email'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{lang === "fr" ? "Contactez-moi" : "Contact me"}</h2>
          <div className='firstname-input inputform'>
            <input className='input' id="firstname" type="text" placeholder=' ' {...register("from_firstname")} required/>
            <label className='label' htmlFor='firstname'>{lang === "fr" ? "Prenom" : "Firstname"} *</label>
          </div>
          <div className='lastname-input inputform'>
            <input className='input' id="lastname" type="text" placeholder=' ' {...register("from_lastname")} required/>
            <label className='label' htmlFor='lastname'>{lang === "fr" ? "Nom" : "Lastname"} *</label>
          </div>
          <div className='email-input inputform'>
            <input className='input' id="email" type="email" placeholder=' ' {...register("reply_to")} required/>
            <label className='label' htmlFor='email'>Email *</label>
          </div>
          <div className='phone-input inputform'>
            <input className='input' id="phone" type="text" placeholder=' ' {...register("phone")}/>
            <label className='label' htmlFor='phone'>{lang === "fr" ? "Téléphone" : "Phone"}</label>
          </div>
          <div className='object-input inputform'>
            <input className='input objectinput' id="object" type="text" placeholder=' ' {...register("object")} required/>
            <label className='label' htmlFor='object'>{lang === "fr" ? "Objet" : "Object"} *</label>
          </div>
          <div className='content-textarea inputform'>
            <textarea className='input textareainput' id="content" placeholder=' ' {...register("message")} required></textarea>
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
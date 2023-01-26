import { useState } from 'react';
import style from "./header.module.scss";
import { ThemeIcon,BurgerMenu,CrossMark } from "../../assets/svg";

type HeaderContent = {
    currentRoute: string,
    theme: string,
    lang: string,
    changeTheme: () => void,
    changeLang: () => void
}

const Header = ({currentRoute, theme,lang, changeTheme,changeLang}: HeaderContent) => {
    const [menuState, setMenuState] = useState(false)
    const OpenMenu = () => {
        setMenuState(!menuState)
    }
    let menuIcon;
    if (menuState === true) {
        menuIcon = <CrossMark />
    } else {
        menuIcon = <BurgerMenu />
    }

    return (
        <header className={theme === "light" ? style.HeaderLight : ""}>
            <div className={style.BurgerMenu} onClick={OpenMenu}>
                {menuIcon}
            </div>
            <div className={style.Name}>
                <h1><a href='/'>Yohan Velay</a></h1>
            </div>
            <nav className={menuState === true ? style.menuActive : ""}>
                <ul>
                    <li><a href="/" className={currentRoute === "Home" ? style.currentNav : ""}>{lang === "fr" ? "Accueil" : "Home"}</a></li>
                    <li><a href="/#/more"className={currentRoute === "More" ? style.currentNav : ""}>{lang === "fr" ? "Plus" : "More"}</a></li>
                    <li><a href="/#/projects"className={currentRoute === "Projects" ? style.currentNav : ""}>{lang === "fr" ? "Projets" : "Projects"}</a></li>
                    <li><a href="/#/contact"className={currentRoute === "Contact" ? style.currentNav : ""}>Contact</a></li>
                </ul>
            </nav>
            <div className={style.OptionIcon}>
                <div className={style.LangIcon}>
                    <p onClick={changeLang}>{lang === "fr" ? "FR" : "EN"}</p>
                </div>
                <div className={style.ThemeIcon} onClick={changeTheme}>
                    <ThemeIcon />
                </div>
            </div>
        </header>
    )
}

export default Header
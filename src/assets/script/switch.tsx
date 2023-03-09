import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";

export const useTheme = (cookie:any):[string, () => void] => {
    const [theme, _setTheme] = useState(cookie? cookie : "dark");

    const setTheme = () => {
        if (theme === "light") {
          _setTheme("dark")
        } else {
          _setTheme("light")
        }
      }

    return [theme, setTheme]
}

export const useLang = (cookie:any):[string, () => void] => {
    const [lang, _setLang] = useState(cookie? cookie : "fr")

    const setLang = () => {if (lang === "fr") {
        _setLang("en");
        document.documentElement.lang = "en";
      } else { 
        _setLang("fr");
        document.documentElement.lang = "fr";
      }
    }

    return [lang, setLang]
}

export const useSwitch = ():[string, () => void,string, () => void] => {
    const [cookies, setCookie] = useCookies(['theme', 'lang']);
    const [theme, setTheme] = useTheme(cookies.theme? cookies.theme : "dark");
    const [lang, setLang] = useLang(cookies.lang? cookies.lang : "fr");

    useEffect(() => {
        if (cookies.theme !== theme) {
        setCookie('theme', theme, { path: '/' });
        }
        if (cookies.lang !== lang) {
        setCookie('lang', lang, { path: '/' });
        }
    }, [theme, lang])

    return [theme, setTheme, lang, setLang]
}
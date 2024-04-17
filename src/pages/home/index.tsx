import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/themeProvider"
import { useState, useEffect } from "react";

import "./home.scss";
import Header from "@/components/header";
import Card from '@/components/card';
import SkillContainer from '@/components/skillContainer';
import { Separator } from "@/components/ui/separator"

import codeWhiteIMG from "@/assets/img/code_white_128.png";
import gameDevWhiteIMG from "@/assets/img/game-dev_white_128.png";
import apiWhiteIMG from "@/assets/img/api_white_128.png";
import codeBlackIMG from "@/assets/img/code_black_128.png";
import gameDevBlackIMG from "@/assets/img/game-dev_black_128.png";
import apiBlackIMG from "@/assets/img/api_black_128.png";
import photoOfMoi from "@/assets/img/photoofmoi.jpg";

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
    Figma,
    Rust,
} from '@/assets/svg';

export const Home = () => {
    const { t } = useTranslation();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 800;

    let theme = useTheme().theme;
    if (theme === "system") {
        theme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
    }

    return (
        <div className="page" id="home">
            <Header/>
            <section id="aboutme" className="font-mono m-8">
                <h2 className="text-3xl my-3">{t("aboutme")}</h2>
                <div className="flex">
                    {!isMobile && <img src={photoOfMoi} className="w-[10rem]" alt='A photo of me'/>}
                    <div className="flex flex-col flex-wrap">
                        <div className="flex info text-2xl flex-wrap">
                            <p>21 {t("years")}</p>
                            <span>/</span>
                            <p>Toulouse</p>
                            <span>/</span>
                            <p>{t("student")}</p>
                        </div>
                        <p className="py-10 px-[1rem] text-md text-justify leading-6">{t("bio")}</p>
                        <div className="flex contact items-center justify-center text-lg flex-wrap">
                            <a href='mailto:yohan.velay@free.fr'>yohan.velay@free.fr</a>
                            <span>/</span>
                            <p>07 81 07 21 78</p>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="wicd" className="font-mono m-8">
                <h2 className="text-3xl my-3">{t("services")}</h2>
                <div className='flex justify-center gap-20 flex-wrap'>
                    <Card title={t("webDevTitle")}
                    content={t("webDevContent")}
                    imgSRC={{
                        light: codeBlackIMG,
                        dark: codeWhiteIMG
                    }} 
                    imgALT='Web Development icon'/>
                    <Card title={t("apiDevTitle")}
                    content={t("apiDevContent")}
                    imgSRC={{
                        light: apiBlackIMG,
                        dark: apiWhiteIMG
                    }} 
                    imgALT='API Icon'/>
                    <Card title={t("gameDevTitle")}
                    content={t("gameDevContent")}
                    imgSRC={{
                        light: gameDevBlackIMG,
                        dark: gameDevWhiteIMG
                    }} 
                    imgALT='Game Development icon'/>
                </div>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="skills" className="font-mono m-8">
                <h2 className="text-3xl my-3">{t("skills")}</h2>
                <div className="flex flex-col">
                    <div className={isMobile ? "flex justify-center flex-col" : "flex justify-center"}>
                        <SkillContainer name='React' content={t("react")}icon={<ReactTSX />}/>
                        <SkillContainer name='Javascript' content={t("javascript")} icon={<JavaScript />}/>
                        <SkillContainer name='Unity' content={t("unity")} icon={<Unity fill={theme === "light" ? "#222C37" : "whitesmoke"}/>}/>
                    </div>
                    <div className="flex justify-center gap-2 flex-wrap">
                        <SkillContainer name='TypeScript' content={<p></p>} icon={<TypeScript />}/>
                        <SkillContainer name='NodeJS' content={<p></p>} icon={<NodeJS />}/>
                        <SkillContainer name='Html5' content={<p></p>} icon={<Html5 />}/>
                        <SkillContainer name='CSS' content={<p></p>} icon={<Css />}/>
                        <SkillContainer name='SCSS' content={<p></p>} icon={<Scss />}/>
                        <SkillContainer name='Visual Studio Code' content={<p></p>} icon={<VsCode />}/>
                        <SkillContainer name='Visual Studio' content={<p></p>} icon={<VsStudio />}/>
                        <SkillContainer name='Git' content={<p></p>} icon={<Git />}/>
                        <SkillContainer name='NPM' content={<p></p>} icon={<NPM />}/>
                        <SkillContainer name='Docker' content={<p></p>} icon={<Docker />}/>
                        <SkillContainer name='Heroku' content={<p></p>} icon={<Heroku />}/>
                        <SkillContainer name='Wordpress' content={<p></p>} icon={<Wordpress />}/>
                        <SkillContainer name='Trello' content={<p></p>} icon={<Trello />}/>
                        <SkillContainer name='Figma' content={<p></p>} icon={<Figma />}/>
                        <SkillContainer name='C++' content={<p></p>} icon={<Cpp />}/>
                        <SkillContainer name='Linux' content={<p></p>} icon={<Linux fill={theme === "light" ? "black" : "whitesmoke"}/>}/>
                        <SkillContainer name='PHP' content={<p></p>} icon={<PHP fill={theme === "light" ? "black" : "whitesmoke"}/>}/>
                        <SkillContainer name='Rust' content={<p></p>} icon={<Rust fill={theme === "light" ? "black" : "whitesmoke"}/>}/>
                        <SkillContainer name='BDD' content={<p></p>} icon={<BDD fill={theme === "light" ? "black" : "whitesmoke"}/>}/>
                        <SkillContainer name='MongoDB' content={<p></p>} icon={<MongoDB />}/>
                        <SkillContainer name='Python' content={<p></p>} icon={<Python />}/>
                        <SkillContainer name='Unreal Engine' content={<p></p>} icon={<UnrealEngine fill={theme === "light" ? "black" : "whitesmoke"}/>}/>
                        <SkillContainer name='Vite' content={<p></p>} icon={<Vite />}/>
                        <SkillContainer name='Go' content={<p></p>} icon={<Go />}/>
                    </div>
                </div>
            </section>
        </div>
    )
}
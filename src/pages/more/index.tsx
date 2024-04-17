import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/themeProvider"
import { useState, useEffect } from 'react';

import Header from "@/components/header";
import SkillBar from '@/components/skillBar';
import InterestContainer from '@/components/interestContainer'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

import {TypeScript,ReactTSX,NodeJS,PHP,Linux,Docker,Git,Python,Unity,UnrealEngine,Wordpress,Web,Rust} from '@/assets/svg';
import { PDF,Controller,Note, Data, Clapperboard, CherryFlower } from '@/assets/svg';

import "./more.scss";

export const More = () => {
    const { t } = useTranslation();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 800;

    const prepareString = (string : string) => {
        const arr: JSX.Element[] = string.split('|').map((value, index) => (
            <li key={index}>{value}</li>
        ));
    
        return <>{arr}</>;
    }

    let theme = useTheme().theme;
    if (theme === "system") {
        theme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
    }

    return (
        <div className="page" id="more">
            <Header/>
            <section id="skills" className="font-mono m-8">
                <h2 className="text-3xl my-3">{t("skills")}</h2>
                <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']}>
                    <AccordionItem value="item-1"  className="mb-10">
                        <AccordionTrigger className="AccordionTrigger text-xl">Web</AccordionTrigger>
                        <AccordionContent className="flex flex-wrap gap-10">
                            <SkillBar name="HTML/CSS/JS" percent={100} color="green" icon={<Web fill={theme === "light" ? "#222C37" : "whitesmoke"}/>}/>
                            <SkillBar name="Typescript" percent={80} color="#188c9f" icon={<TypeScript />}/>
                            <SkillBar name="React" percent={96} color="#188c9f" icon={<ReactTSX/>}/>
                            <SkillBar name="NodeJS" percent={100} color="green" icon={<NodeJS/>}/>
                            <SkillBar name="PHP" percent={80} color="#188c9f" icon={<PHP fill={theme === "light" ? "black" : "whitesmoke"}/>}/>
                            <SkillBar name="Wordpress" percent={50} color="orange" icon={<Wordpress/>}/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2"  className="mb-10">
                        <AccordionTrigger className="AccordionTrigger text-xl">Environnement</AccordionTrigger>
                        <AccordionContent className="flex flex-wrap gap-10">
                            <SkillBar name="Windows" percent={70} color="#188c9f"/>
                            <SkillBar name="Windows Server" percent={70} color="#188c9f"/>
                            <SkillBar name="Linux" percent={90} color="#188c9f" icon={<Linux fill={theme === "light" ? "black" : "whitesmoke"}/>}/>
                            <SkillBar name="VMWare" percent={86} color="#188c9f"/>
                            <SkillBar name="Docker" percent={90} color="#188c9f" icon={<Docker/>}/>
                            <SkillBar name="Git" percent={100} color="green" icon={<Git/>}/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="AccordionTrigger text-xl">Application</AccordionTrigger>
                        <AccordionContent className="flex flex-wrap gap-10">
                            <SkillBar name="Python" percent={100} color="green" icon={<Python/>}/>
                            <SkillBar name="Unity & C#" percent={75} color="#188c9f" icon={<Unity fill={theme === "light" ? "#222C37" : "whitesmoke"}/>}/>
                            <SkillBar name="Unreal Engine & C++" percent={40} color="orange" icon={<UnrealEngine fill={theme === "light" ? "#222C37" : "whitesmoke"}/>}/>
                            <SkillBar name="Rust" percent={45} color="orange" icon={<Rust fill={theme === "light" ? "#222C37" : "whitesmoke"}/>}/>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="formations" className={isMobile ? "font-mono m-8 mobile" : "font-mono m-8"}>
                <h2 className="text-3xl my-3">{t("formations")}</h2>
                <div className="timeline">
                    <div className="container right">
                        <div className="content">
                            <h4 className="date">2023 - {t("now")}</h4>
                            <h4 className='title'>Bachelor 3 Informatique (Bac+3)</h4>
                            <div className='Text'>
                                <p>Campus Ynov Toulouse</p>
                                <ul>
                                    {prepareString(t("ynov3"))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container left">
                        <div className="content">
                            <h4 className="date">2022 - 2023</h4>
                            <h4 className='title'>Bachelor 2 Informatique (Bac+2)</h4>
                            <div className='Text'>
                                <p>Campus Ynov Toulouse</p>
                                <ul>
                                    {prepareString(t("ynov2"))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container right">
                        <div className="content">
                            <h4 className="date">2021 - 2022</h4>
                            <h4 className='title'>Bachelor 1 Informatique (Bac+1)</h4>
                            <div className='Text'>
                                <p className='left'>Campus Ynov Toulouse</p>
                                <ul>
                                    {prepareString(t("ynov1"))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container left">
                        <div className="content">
                            <h4 className="date">2020 - 2021</h4>
                            <h4 className='title'>{t("bac")}</h4>
                            <div className='Text'>
                                <p>Emilie de rodat, Toulouse</p>
                                <ul>
                                    {prepareString(t("lycee"))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="interest" className="font-mono m-8">
                <h2 className="text-3xl my-3">{t("interest")}</h2>
                <div className='flex justify-evenly flex-wrap gap-[5%]'>
                    <InterestContainer title={t("gaming")} icon={<Controller/>}/>
                    <InterestContainer title={t("music")} icon={<Note/>}/>
                    <InterestContainer title={t("computer")} icon={<Data/>}/>
                    <InterestContainer title={t("movie")} icon={<Clapperboard/>}/>
                    <InterestContainer title={t("jCulture")} icon={<CherryFlower/>}/>
                </div>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="cv" className="font-mono m-8">
                <h2 className="text-3xl my-3">{t("cv")}</h2>
                <div className="flex justify-evenly">
                    <a href={t("cvLink")} target="_blank" rel="noreferrer" className="flex justify-center w-[100%]">
                        <PDF width={isMobile ? "30%" : "10%"}/>
                    </a>
                </div>
            </section>
        </div>
    )
}
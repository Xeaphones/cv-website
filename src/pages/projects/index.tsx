import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import Header from "@/components/header";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import { ReactTSX, Go, Figma } from '@/assets/svg';
import image from "@/assets/img/carnetsportif_thumbnail.png"
import "./projects.scss";


export const Projects = () => {
    const { t } = useTranslation();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 800;
    const prepareString = (string : string, className? : string) => {
        const arr: JSX.Element[] = string.split('|').map((value, index) => (
            <>
                <li key={index} className={className}>{value}</li>
                {index !== string.split('|').length - 1 && <Separator orientation="vertical"/>}
            </>
        ));
    
        return <>{arr}</>;
    }

    return (
        <div className="page" id="project">
            <Header/>
            <section id="experiences" className={isMobile ? "font-mono m-8 mobile" : "font-mono m-8"}>
                <h2 className="text-3xl my-3">Experiences</h2>
                <div className="timeline">
                    <div className="container right">
                        <div className="content">
                            <h4 className="date">{t("since")} {t("october")}  2023</h4>
                            <h4 className='title'>{t("andilTitle")}</h4>
                            <div className='Text'>
                                <a href="https://www.andil.fr/" target="_blank" rel="noreferrer">Andil, 1202 L’occitane 31670 Labège</a>
                                <p>{t("andilDesc")}</p>
                                <ul>
                                    {prepareString(t("andilContent"), "break-words")}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container left">
                        <div className="content">
                            <h4 className="date">2022 - 2023</h4>
                            <h4 className='title'>{t("fullstack2022Title")}</h4>
                            <div className='Text'>
                                <p>Campus Ynov Toulouse</p>
                                <p>{t("fullstack2022Desc")}</p>
                                <ul>
                                    {prepareString(t("fullstack2022Content"), "break-words")}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container right">
                        <div className="content">
                            <h4 className="date">2021 - 2022</h4>
                            <h4 className='title'>{t("YScapeTitle")}</h4>
                            <div className='Text'>
                                <p className='left'>Campus Ynov Toulouse</p>
                                <p>{t("YScapeDesc")}</p>
                                <ul>
                                    {prepareString(t("YScapeContent"), "break-words")}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container left">
                        <div className="content">
                            <h4 className="date">2018 - 2019</h4>
                            <h4 className='title'>{t("app2019Title")}</h4>
                            <div className='Text'>
                                <p>Veltech, Toulouse</p>
                                <p>{t("app2019Desc")}</p>
                                <ul>
                                    {prepareString(t("app2019Content"), "break-words")}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container right">
                        <div className="content">
                            <h4 className="date">{t("june")} 2016</h4>
                            <h4 className='title'>{t("stage2016Title")}</h4>
                            <div className='Text'>
                                <p className='left'>Veltech, Toulouse</p>
                                <p>{t("stage2016Desc")}</p>
                                <ul>
                                    {prepareString(t("stage2016Content"), "break-words")}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="projects" className="font-mono m-8">
                <h2 className="text-3xl my-3">{t("projects")}</h2>
                <div className="flex">
                    <Dialog>
                    <DialogTrigger className={!isMobile ? "w-[20%]" : undefined}>
                        <div className="thumbnail">
                            <img src={image} alt="CarnetSportif"/>
                            <div className="content">
                                <p>CarnetSportif</p>
                            </div>
                        </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[80%!important]">
                            <DialogHeader>
                            <DialogTitle className="text-primary text-4xl">CarnetSportif</DialogTitle>
                            <DialogDescription className="text-2xl mb-[1rem!important]">{t("carnetSportifLabel")}</DialogDescription>
                            <DialogDescription className="text-primary text-2xl">{t("objectives")}</DialogDescription>
                            <DialogDescription>{t("carnetSportifDesc")}</DialogDescription>
                            <DialogDescription className="text-primary text-2xl">{t("technologies")}</DialogDescription>
                            <div className="flex h-[3rem]">
                                <ReactTSX />
                                <Go />
                                <Figma />
                            </div>
                            <DialogDescription className="text-primary text-2xl">{t("keyElements")}</DialogDescription>
                            <ul className="text-base text-muted-foreground gap-2 flex">
                                {prepareString(t("carnetSportifKey"), "text-center")}
                            </ul>
                            <DialogDescription className="text-primary text-2xl">{t("resume")}</DialogDescription>
                            <DialogDescription>{t("carnetSportifResume")}</DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </div>
    )
}
import style from './projectComponent.module.scss';
import { useState } from 'react';
import { CrossMark,Github,Web } from '../../assets/svg';

type ProjectComponent = {
    title: string,
    label: string,
    description: string,
    image: string,
    link?: string,
    github?: string,
    carousel?: string[],
    icon?: JSX.Element[]
    element?: string[]
    conclusion?: string
}

const ProjectComponent = ({title,label,description,image,link,github,carousel,icon,element,conclusion}:ProjectComponent) => {
    const [popup,setPopup] = useState(false);

    return (
        <>
            <div className={style.thumbnail} onClick={() => {setPopup(true)}}>
                <img src={image} alt={title}/>
                <div className={style.content}>
                    <p>{title}</p>
                </div>
            </div>
            {popup && <div className={style.popup}>
                <div className={style.content}>
                    <div className={style.close} onClick={() => {setPopup(false)}}>
                        <CrossMark/>
                    </div>
                    <div className={style.content2}>
                        <div className={style.title}>
                            <strong>{title}</strong>
                            <p>{label}</p>
                        </div>
                        <section className={style.introduction}>
                            <div>
                                <p className={style.title}>Objectif</p>
                                <p>{description}</p>
                            </div>
                            {icon && 
                            <div>
                                <p className={style.title}>Technologie</p>
                                <div className={style.icon}>
                                    {icon?.map((item,index) => {
                                        return (
                                            <div key={index}>
                                                {item}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>}
                            <div>
                                <p className={style.title}>Element clefs</p>
                                <ul>
                                    {element?.map((item,index) => {
                                        return (
                                            <li key={index}>{item}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            {conclusion &&
                            <div>
                                <p className={style.title}>Conclusion</p>
                                <p>{conclusion}</p>
                            </div>}
                        </section>
                        <section className={style.link}>
                            {github && <a target='_blank' href={github}><Github/></a>}
                            {link && <a target='_blank' href={link}><Web/></a>}
                        </section>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ProjectComponent
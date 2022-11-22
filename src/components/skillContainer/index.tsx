import style from './skillcontainer.module.scss'

type SkillContainerContent = {
    icon: JSX.Element,
    name: string,
    content: string,
    theme: string
}

const SkillContainer = ({icon,name,content,theme}: SkillContainerContent) => {
    let infoDiv = null;
    if (name != '' || content != '') {
        infoDiv = (
            <div className={style.Info}>
                <p className={style.Name}><strong>{name}</strong></p>
                <p className={style.Content}>{content}</p>
            </div>
        )
    }
    let goToSkill = () => {
        location.href="/#/more#skills"
    }

    return (
        <div onClick={goToSkill} className={[theme === "light" ? style.SkillLightContainer : "",infoDiv === null ? style.SkillIconContainer : "",style.SkillContainer].join(" ")}>
            <i>{icon}</i>
            {infoDiv}
        </div>
    )
}

export default SkillContainer
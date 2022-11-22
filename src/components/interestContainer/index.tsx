import style from './interestcontainer.module.scss'

type InterestContainerContent = {
    icon: JSX.Element,
    title: string,
    theme: string
}

const InterestContainer = ({icon,title,theme}: InterestContainerContent) => {
    return (
        <div className={[style.interestContainer,theme === "light" ? style.interestLightContainer : ""].join(" ")}>
            <i>{icon}</i>
            <p>{title}</p>
        </div>
    )
}

export default InterestContainer
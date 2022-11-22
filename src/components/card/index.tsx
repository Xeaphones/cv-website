import style from "./card.module.scss"

type CardContent = {
    title: string,
    content: string,
    imgSRC: string,
    imgALT: string,
    theme: string
}

const Card = ({title,content,imgSRC,imgALT,theme}: CardContent) => {
    let newText = content.split ('\\n').map ((item, i) => <p key={i}>{item}</p>);
    
    return (
        <div className={[(theme === "light" ? style.cardLight : ""),style.card].join(" ")}>
            <div className={[style.face,style.face1].join(" ")}>
                <div className={style.content}>
                    <img src={imgSRC} alt={imgALT}></img>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className={[style.face,style.face2].join(" ")}>
                <div className={style.content}>
                    {newText}
                    <a href="#/More">Read More</a> 
                </div>
            </div>
        </div>
    )
}

export default Card
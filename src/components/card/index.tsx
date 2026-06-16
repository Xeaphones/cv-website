import style from "./card.module.scss"
import { useResolvedTheme } from "@/lib/hooks";

type CardContent = {
    title: string,
    content: string,
    imgSRC: {light: string, dark: string},
    imgALT: string,
}

const Card = ({title,content,imgSRC,imgALT}: CardContent) => {
    let newText = content.split ('\\n').map ((item, i) => <p key={i}>{item}</p>);

    const theme = useResolvedTheme();
    const src = theme === "light" ? imgSRC.light : imgSRC.dark
    
    return (
        <div className={style.card}>
            <div className={[style.face,style.face1].join(" ")}>
                <div className={style.content}>
                    <img src={src} alt={imgALT}></img>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className={[style.face,style.face2].join(" ")}>
                <div className={style.content}>
                    {newText}
                </div>
            </div>
        </div>
    )
}

export default Card

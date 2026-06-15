import { useNavigate, useLocation } from "react-router-dom"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { useIsMobile } from "@/lib/hooks";
import style from './skillcontainer.module.scss'

type SkillContainerContent = {
    icon: JSX.Element,
    name: string,
    content: JSX.Element | string,
}

const SkillContainer = ({icon,name,content}: SkillContainerContent) => {
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useIsMobile();

    let infoDiv = null;
    if (typeof content === 'string' && content !== '') {
        infoDiv = (
            <div className={style.Info}>
                <p className={style.Name}><strong>{name}</strong></p>
                <p className={style.Content}>{content}</p>
            </div>
        )
    }

    const goToSkill = () => {
        if (location.pathname === "/more") {
            document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
            window.history.replaceState(null, "", "/more#skills")
        } else {
            navigate("/more#skills")
        }
    }

    return (
        <HoverCard closeDelay={0} openDelay={200}>
            <HoverCardTrigger onClick={goToSkill} className={[infoDiv === null ? style.SkillIconContainer : undefined, style.SkillContainer, isMobile ? style.mobile : undefined].join(" ")}>
                <i>{icon}</i>
                {infoDiv}
            </HoverCardTrigger>
            {
                (typeof content !== 'string') && 
                <HoverCardContent>
                    <p className="text-center text-primary"><strong>{name}</strong></p>
                    {content}
                </HoverCardContent>
            }
        </HoverCard>
    )
}

export default SkillContainer
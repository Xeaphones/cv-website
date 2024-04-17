import { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import style from './skillbar.module.scss'

type SkillBarContent = {
    name: string,
    percent: number,
    color?: string,
    icon?: JSX.Element
}

const SkillBar = ({name,percent,color,icon}: SkillBarContent) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 800;

    return (
        <div className={[style.SkillBar, isMobile ? style.mobile : undefined].join(" ")}>
            {icon && <div className={style.icon}>{icon}</div>}
            <div className='flex flex-col w-[100%] gap-2'>
              <div className={style.title}>
                  <p>{name}</p>
              </div>
              <Progress value={percent} color={color}/>
            </div>
        </div>
    )
}

export default SkillBar
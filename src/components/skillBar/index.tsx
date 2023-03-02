import { useRef,useEffect,useMemo,useState } from 'react'
import style from './skillbar.module.scss'

type SkillBarContent = {
    name: string,
    percent: string,
    color: string,
    theme: string
    icon?: JSX.Element
}

const SkillBar = ({name,percent,color,theme,icon}: SkillBarContent) => {
    const [width,setWidth] = useState("0%");
    const SkillBar = useRef<HTMLDivElement>(null);

    const isInViewport = useIsInViewport(SkillBar);
    if (isInViewport && width === "0%") {
        let interval = setInterval(() => {
            setWidth(width => (parseInt(width) + 1).toString() + "%");
        }, 80);
        
        setTimeout(() => {
            clearInterval(interval);
        }, parseInt(percent) * (41.5 * 1));
    }
        
    function useIsInViewport(ref: React.RefObject<HTMLDivElement>) {
        const [isIntersecting, setIsIntersecting] = useState(false);
      
        const observer = useMemo(
          () =>
            new IntersectionObserver(([entry]) =>
              setIsIntersecting(entry.isIntersecting),
            ),
          [],
        );
      
        useEffect(() => {
          observer.observe(ref.current as HTMLDivElement);
      
          return () => {
            observer.disconnect();
          };
        }, [ref, observer]);

        return isIntersecting;
    }

    return (
        <div ref={SkillBar} className={[theme === "light" ? style.SkillLightBar : "",style.SkillBar].join(" ")}>
            {icon && <div className={style.icon}>{icon}</div>}
            <div className='container'>
              <div className={style.title}>
                  <p>{name}</p>
              </div>
              <div className={[style.container, percent === "100%" && width === "100%" ? style.full : ""].join(" ")}>
                  {
                    color === "orange" ?
                    <div className={style.percent} style={{width: width,backgroundColor: color,color: 'black'}}>{width}</div>
                    :
                    <div className={style.percent} style={{width: width,backgroundColor: color,color: "black"}}>{width}</div>
                  }
              </div>
            </div>
        </div>
    )
}

export default SkillBar
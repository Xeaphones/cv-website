import { useRef,useEffect,useMemo,useState } from 'react'
import style from './skillbar.module.scss'

type SkillBarContent = {
    name: string,
    percent: string,
    color: string,
    theme: string
}

const SkillBar = ({name,percent,color,theme}: SkillBarContent) => {
    const [width,setWidth] = useState("0%");
    const SkillBar = useRef<HTMLDivElement>(null);

    const isInViewport = useIsInViewport(SkillBar);
    if (isInViewport && width === "0%") {
        let interval = setInterval(() => {
            setWidth(width => (parseInt(width) + 1).toString() + "%");
        }, 100);
        
        setTimeout(() => {
            clearInterval(interval);
        }, 100 * parseInt(percent) / 2 + 100);
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
            <div className={style.title}>
                <p>{name}</p>
            </div>
            <div className={[style.container, percent === "100%" && width === "100%" ? style.full : ""].join(" ")}>
                <div className={style.percent} style={{width: width,backgroundColor: color}}>{width}</div>
            </div>
        </div>
    )
}

export default SkillBar
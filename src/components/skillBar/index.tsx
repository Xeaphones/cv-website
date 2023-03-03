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
    let [width,setWidth] = useState("0%");
    const SkillBar = useRef<HTMLDivElement>(null);

    const isInViewport = useIsInViewport(SkillBar);
    let interval: any;

    useEffect(() => {
        if (isInViewport && width !== percent) {
          interval = setInterval(() => {
            setWidth(width => (parseInt(width) + 1).toString() + "%");
          }, 50);

          return () => {
            clearInterval(interval);
          }
        }
    });

    useEffect(() => {
        if (width === percent) {
          clearInterval(interval);
        }
    },[width]);
        
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
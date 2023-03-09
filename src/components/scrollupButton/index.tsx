import style from './scrollup.module.scss'
import { UpArrow } from "../../assets/svg";
import { useEffect,useState } from 'react';

const ScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

type ScrollUpButon = {
    min: number
}

const ScrollUpButton = ({min}:ScrollUpButon) => {
    const [showScroll, setShowScroll] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    useEffect(() => {
        const onScroll = (e : any) => {
            setScrollY(e.target.documentElement.scrollTop);
            setScrollY(e.target.documentElement.scrollTop - scrollY);
        };
        window.addEventListener("scroll", onScroll);

        if (window.scrollY >= min) {
            setShowScroll(true)
        } else {
            setShowScroll(false)
        }

        return () => window.removeEventListener("scroll", onScroll);
    })

    return (
        <div className={style.scrollup} style={showScroll ? {display:'flex'} : {display:'none'}} onClick={ScrollToTop}>
            <UpArrow />
        </div>
    )
}

export default ScrollUpButton
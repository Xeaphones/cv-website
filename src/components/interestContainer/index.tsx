import { useState, useEffect } from 'react';

import style from './interestcontainer.module.scss'

type InterestContainerContent = {
    icon: JSX.Element,
    title: string,
}

const InterestContainer = ({icon,title}: InterestContainerContent) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 800;

    return (
        <div className={[style.interestContainer, isMobile ? style.mobile : undefined].join(" ")}>
            <i>{icon}</i>
            <p>{title}</p>
        </div>
    )
}

export default InterestContainer
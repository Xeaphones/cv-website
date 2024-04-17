import { useEffect, useState } from "react";
import { FiMenu } from 'react-icons/fi'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "@/components/themeToggle"
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/assets/config";
import "./header.scss";

const Header = () => {
    const { i18n, t } = useTranslation();
    const [width, setWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 800;


    const Routes = [
        { link: '/', name: t("home") },
        { link: '/more', name: t("more") },
        { link: '/projects', name: t("projects") },
        { link: '/contact', name: t("contact") },
    ]

    const location = useLocation();
    const pathName = location.pathname;

    const onChangeLang = (value: string) => {
        i18n.changeLanguage(value);
        localStorage.setItem("lang", value)
        document.documentElement.lang = value;
    };
      
    return (
        <header className="font-mono shadow-2xl flex h-20 px-10 justify-between items-center bg-background">
            {!isMobile && 
            <>
            <h1 className="text-3xl"><Link to='/'>Yohan Velay</Link></h1>
            <NavigationMenu>
                <NavigationMenuList>
                    {Routes.map(({link, name}) => (
                        <NavigationMenuItem>
                            <Link to={link}>
                                {
                                    link === pathName 
                                    ? <NavigationMenuLink className={navigationMenuTriggerStyle()} data-current="current">{name}</NavigationMenuLink>
                                    : <NavigationMenuLink className={navigationMenuTriggerStyle()}>{name}</NavigationMenuLink>
                                }
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            </>}
            {isMobile && 
            <div className="flex gap-5">
                <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    <FiMenu size={30}/>
                </div>
                {menuOpen && 
                <NavigationMenu orientation="vertical" className="header-mobile">
                    <NavigationMenuList className="flex-col">
                        {Routes.map(({link, name}) => (
                            <NavigationMenuItem>
                                <Link to={link} className="text-2xl">
                                    {
                                        link === pathName 
                                        ? <NavigationMenuLink className={navigationMenuTriggerStyle()} data-current="current">{name}</NavigationMenuLink>
                                        : <NavigationMenuLink className={navigationMenuTriggerStyle()}>{name}</NavigationMenuLink>
                                    }
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>}
                <h2 className="text-2xl"><Link to='/'>Yohan Velay</Link></h2>
            </div>}
            <div className="inline-flex gap-2">
                <Select defaultValue={i18n.language} onValueChange={onChangeLang}>
                    <SelectTrigger className={isMobile ? "w-[70px]" : "w-[120px]"}>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                    {!isMobile && LANGUAGES.map(({ code, label }) => (
                        <SelectItem key={code} value={code}>{t(label)}</SelectItem>
                    ))}
                    {isMobile && LANGUAGES.map(({ code }) => (
                        <SelectItem key={code} value={code}>{t(code)}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <ThemeToggle/>
            </div>
        </header>
    )
}

export default Header
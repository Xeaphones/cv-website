import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
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
        <header className="font-mono">
            <h1 className="text-2xl"><Link to='/'>Yohan Velay</Link></h1>
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
            <div className="inline-flex gap-2">
                <Select defaultValue={i18n.language} onValueChange={onChangeLang}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                    {LANGUAGES.map(({ code, label }) => (
                        <SelectItem key={code} value={code}>{label}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <ThemeToggle/>
            </div>
        </header>
    )
}

export default Header
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/themeProvider"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"

import { Discord, Linkedin, Github } from '@/assets/svg';
import './contact.scss';

const formSchema = z.object({
    firstname: z.string().min(1, { message: "Please enter your first name" }),
    lastname: z.string().min(1, { message: "Please enter your last name" }),
    email: z.string().email({ message: "Please enter a valid email"}),
    phone: z.string(),
    object: z.string().min(1, { message: "Please enter an object" }),
    message: z.string().min(1, { message: "Please enter a message" }),
})

export const Contact = () => {
    const { t } = useTranslation();
    const { toast } = useToast()
    const [width, setWidth] = useState(window.innerWidth);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            object: "",
            message: "",
        },
    })

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 800;

    const onSubmit = (data: any) => {
        console.log(data)
    }

    let theme = useTheme().theme;
    if (theme === "system") {
        theme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            toast({
                variant: "success",
                title: "Username copied to clipboard",
                duration: 3000,
            })
        })
        .catch(() => {
            toast({
                variant: "destructive",
                title: "Failed to copy to clipboard",
                duration: 3000,
            })
        })
    }

    return (
        <div className="page" id="contact">
            <Header/>
            <Toaster/>
            <section id="contacts" className="font-mono m-8">
                <p className="text-xl text-center m-5"><span className="text-primary">Mail:</span> <a href="mailto:yohan.velay@free.fr">yohan.velay@free.fr</a></p>
                <p className="text-xl text-center m-5"><span className="text-primary">{t("phone")}:</span> 07 81 07 21 78</p>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="socials" className="font-mono m-8">
                <div className="flex justify-center gap-10">
                    <HoverCard closeDelay={0} openDelay={200}>
                        <HoverCardTrigger className="w-20" href="https://fr.linkedin.com/in/yohan-velay" target="_blank">
                            <i><Linkedin/></i>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className="text-center text-primary"><strong>Linkedin</strong></p>
                            <p className="text-center">Yohan Velay</p>
                        </HoverCardContent>
                    </HoverCard>
                    <HoverCard closeDelay={0} openDelay={200}>
                        <HoverCardTrigger className="w-20" href="https://github.com/Xeaphones" target="_blank">
                            <i><Github fill={theme === "light" ? "#222C37" : "whitesmoke"}/></i>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className="text-center text-primary"><strong>Github</strong></p>
                            <p className="text-center">Xeaphones</p>
                        </HoverCardContent>
                    </HoverCard>
                    <HoverCard closeDelay={0} openDelay={200}>
                        <HoverCardTrigger className="w-20" onClick={() => copyToClipboard("xeaphones")}>
                            <i><Discord/></i>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className="text-center text-primary"><strong>Discord</strong></p>
                            <p className="text-center">xeaphones</p>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </section>
            <Separator className="w-[90%] relative left-[5%]"/>
            <section id="contact-form" className="font-mono m-8">
                <h2 className="text-2xl text-center mb-5">{t("contactme")}</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormItem className={isMobile ? "flex gap-5 space-y-0 flex-col" : "flex gap-5 space-y-0"}>
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("firtname")} *</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("firstnamePlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("lastname")} *</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("lastnamePlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </FormItem>
                    <FormItem className={isMobile ? "flex gap-5 space-y-0 my-5 flex-col" : "flex gap-5 space-y-0 my-5"}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("email")} *</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("emailPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t("phone")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("phonePlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </FormItem>
                    <FormField
                        control={form.control}
                        name="object"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-0 my-5">
                                <FormLabel>{t("object")} *</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("objectPlaceholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-0 my-5">
                                <FormLabel>{t("message")} *</FormLabel>
                                <FormControl>
                                    <Textarea placeholder={t("messagePlaceholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div className="flex gap-5 align-center text-center">
                        <Button type="submit">{t("send")}</Button>
                        <p className="text-muted-foreground">{t("required")}</p>
                    </div>
                    </form>
                </Form>
            </section>
        </div>
    );
};
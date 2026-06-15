import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PageSection } from "@/components/PageSection";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/lib/hooks";

const formSchema = z.object({
  firstname: z.string().min(1, { message: "Please enter your first name" }),
  lastname: z.string().min(1, { message: "Please enter your last name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string(),
  object: z.string().min(1, { message: "Please enter an object" }),
  message: z.string().min(1, { message: "Please enter a message" }),
});

export function ContactFormSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
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
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <PageSection id="contact-form" title={t("contactme")} headingClassName="text-2xl text-center mb-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem className={isMobile ? "flex gap-5 space-y-0 flex-col" : "flex gap-5 space-y-0"}>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("firstname")} *</FormLabel>
                  <FormControl>
                    <Input placeholder={t("firstnamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              )}
            />
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
              )}
            />
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
              )}
            />
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
            )}
          />
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
            )}
          />
          <div className="flex gap-5 align-center text-center">
            <Button type="submit">{t("send")}</Button>
            <p className="text-muted-foreground">{t("required")}</p>
          </div>
        </form>
      </Form>
    </PageSection>
  );
}

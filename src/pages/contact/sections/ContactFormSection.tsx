import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  CONTACT_FORM_DEFAULT_VALUES,
  CONTACT_FORM_FIELDS,
  createContactFormSchema,
} from "../contactFormConfig";

export function ContactFormSection() {
  const { t } = useTranslation();
  const formSchema = createContactFormSchema(t);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: CONTACT_FORM_DEFAULT_VALUES,
  });

  const onSubmit = (data: typeof CONTACT_FORM_DEFAULT_VALUES) => {
    console.log(data);
  };

  const firstRow = CONTACT_FORM_FIELDS.filter((field) => field.name === "firstname" || field.name === "lastname");
  const secondRow = CONTACT_FORM_FIELDS.filter((field) => field.name === "email" || field.name === "phone");
  const fullWidthFields = CONTACT_FORM_FIELDS.filter(
    (field) => field.name === "object" || field.name === "message",
  );

  return (
    <PageSection id="contact-form" title={t("contactme")}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-3xl rounded-lg border border-border/60 bg-card/30 p-4 shadow-sm sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {firstRow.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {t(fieldConfig.labelKey)} {fieldConfig.required ? "*" : ""}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t(fieldConfig.placeholderKey)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {secondRow.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {t(fieldConfig.labelKey)} {fieldConfig.required ? "*" : ""}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t(fieldConfig.placeholderKey)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="mt-5 space-y-5">
            {fullWidthFields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {t(fieldConfig.labelKey)} {fieldConfig.required ? "*" : ""}
                    </FormLabel>
                    <FormControl>
                      {fieldConfig.type === "textarea" ? (
                        <Textarea placeholder={t(fieldConfig.placeholderKey)} className="min-h-32" {...field} />
                      ) : (
                        <Input placeholder={t(fieldConfig.placeholderKey)} {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">{t("required")}</p>
            <Button type="submit">{t("send")}</Button>
          </div>
        </form>
      </Form>
    </PageSection>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PageSection } from "@/shared/components/PageSection";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useToast } from "@/shared/ui/use-toast";
import { SITE_EMAIL } from "@/lib/siteConfig";
import {
  CONTACT_FORM_DEFAULT_VALUES,
  CONTACT_FORM_FIELDS,
  createContactFormSchema,
} from "../contactFormConfig";

function buildMailtoUrl(data: typeof CONTACT_FORM_DEFAULT_VALUES): string {
  const subject = encodeURIComponent(data.object.trim());
  const lines = [
    data.message.trim(),
    "",
    "—",
    `${data.firstname.trim()} ${data.lastname.trim()}`.trim(),
    data.email.trim(),
  ];
  if (data.phone.trim()) {
    lines.push(data.phone.trim());
  }
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
}

export function ContactFormSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const formSchema = createContactFormSchema(t);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: CONTACT_FORM_DEFAULT_VALUES,
  });

  const onSubmit = (data: typeof CONTACT_FORM_DEFAULT_VALUES) => {
    setSubmitting(true);
    try {
      const mailto = buildMailtoUrl(data);
      window.location.href = mailto;
      toast({
        variant: "success",
        title: t("contactSuccess"),
        duration: 4000,
      });
      form.reset();
    } catch {
      toast({
        variant: "destructive",
        title: t("contactError"),
        duration: 4000,
      });
    } finally {
      setSubmitting(false);
    }
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
          noValidate
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
                      <Input
                        placeholder={t(fieldConfig.placeholderKey)}
                        required={fieldConfig.required}
                        aria-required={fieldConfig.required || undefined}
                        {...field}
                      />
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
                      <Input
                        placeholder={t(fieldConfig.placeholderKey)}
                        type={fieldConfig.name === "email" ? "email" : "text"}
                        required={fieldConfig.required}
                        aria-required={fieldConfig.required || undefined}
                        {...field}
                      />
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
                        <Textarea
                          placeholder={t(fieldConfig.placeholderKey)}
                          className="min-h-32"
                          required={fieldConfig.required}
                          aria-required={fieldConfig.required || undefined}
                          {...field}
                        />
                      ) : (
                        <Input
                          placeholder={t(fieldConfig.placeholderKey)}
                          required={fieldConfig.required}
                          aria-required={fieldConfig.required || undefined}
                          {...field}
                        />
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
            <Button type="submit" disabled={submitting}>
              {t("send")}
            </Button>
          </div>
        </form>
      </Form>
    </PageSection>
  );
}

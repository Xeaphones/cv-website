import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, type FieldErrors } from "react-hook-form";

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
import { toast } from "@/shared/ui/use-toast";
import { EMAIL_PRE_SUBJECT, SITE_EMAIL } from "@/lib/siteConfig";
import {
  CONTACT_FORM_DEFAULT_VALUES,
  CONTACT_FORM_FIELDS,
  createContactFormResolver,
  type ContactFormValues,
} from "../contactFormConfig";

function buildMailtoSubject(object: string): string {
  const topic = object.trim();
  const prefix = EMAIL_PRE_SUBJECT.trim();
  if (!prefix) return topic;
  if (!topic) return prefix;
  return `${prefix} ${topic}`;
}

function buildMailtoUrl(data: ContactFormValues): string {
  const subject = encodeURIComponent(buildMailtoSubject(data.object));
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

function collectErrorMessages(errors: FieldErrors<ContactFormValues>): string[] {
  return CONTACT_FORM_FIELDS.flatMap((field) => {
    const message = errors[field.name]?.message;
    return typeof message === "string" && message.trim() ? [message] : [];
  });
}

export function ContactFormSection() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: createContactFormResolver(t),
    defaultValues: CONTACT_FORM_DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const onInvalid = (errors: FieldErrors<ContactFormValues>) => {
    const issues = collectErrorMessages(errors);
    toast({
      variant: "destructive",
      title: t("contactValidationError"),
      description: issues.length > 0 ? issues.join(" · ") : undefined,
      duration: 5000,
    });
  };

  const onSubmit = (data: ContactFormValues) => {
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
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("contactError"),
        description: error instanceof Error ? error.message : undefined,
        duration: 5000,
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
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
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
                          aria-required={fieldConfig.required || undefined}
                          {...field}
                        />
                      ) : (
                        <Input
                          placeholder={t(fieldConfig.placeholderKey)}
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

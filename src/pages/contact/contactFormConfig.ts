import type { FieldErrors, Resolver } from "react-hook-form";
import { z } from "zod";

export type ContactFieldType = "input" | "textarea";

export type ContactFieldName =
  | "firstname"
  | "lastname"
  | "email"
  | "phone"
  | "object"
  | "message";

export type ContactFieldConfig = {
  name: ContactFieldName;
  type: ContactFieldType;
  required: boolean;
  labelKey: string;
  placeholderKey: string;
};

export const CONTACT_FORM_FIELDS: ContactFieldConfig[] = [
  {
    name: "firstname",
    type: "input",
    required: true,
    labelKey: "firstname",
    placeholderKey: "firstnamePlaceholder",
  },
  {
    name: "lastname",
    type: "input",
    required: true,
    labelKey: "lastname",
    placeholderKey: "lastnamePlaceholder",
  },
  {
    name: "email",
    type: "input",
    required: true,
    labelKey: "email",
    placeholderKey: "emailPlaceholder",
  },
  {
    name: "phone",
    type: "input",
    required: false,
    labelKey: "phone",
    placeholderKey: "phonePlaceholder",
  },
  {
    name: "object",
    type: "input",
    required: true,
    labelKey: "object",
    placeholderKey: "objectPlaceholder",
  },
  {
    name: "message",
    type: "textarea",
    required: true,
    labelKey: "message",
    placeholderKey: "messagePlaceholder",
  },
];

export const CONTACT_FORM_DEFAULT_VALUES = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  object: "",
  message: "",
};

export type ContactFormValues = typeof CONTACT_FORM_DEFAULT_VALUES;

export function createContactFormSchema(t: (key: string) => string) {
  return z.object({
    firstname: z.string().min(1, { message: t("contactFirstNameRequired") }),
    lastname: z.string().min(1, { message: t("contactLastNameRequired") }),
    email: z.email({ message: t("contactEmailInvalid") }),
    phone: z.string(),
    object: z.string().min(1, { message: t("contactObjectRequired") }),
    message: z.string().min(1, { message: t("contactMessageRequired") }),
  });
}

/** Zod 4–safe resolver (avoids throwing ZodError that older zodResolver mishandles). */
export function createContactFormResolver(
  t: (key: string) => string,
): Resolver<ContactFormValues> {
  const schema = createContactFormSchema(t);

  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<ContactFormValues> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key !== "string" || key in errors) continue;
      errors[key as ContactFieldName] = {
        type: issue.code,
        message: issue.message,
      };
    }

    return { values: {}, errors };
  };
}

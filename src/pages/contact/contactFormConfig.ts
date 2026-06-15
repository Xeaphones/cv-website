import { z } from "zod";

export type ContactFieldType = "input" | "textarea";

export type ContactFieldConfig = {
  name: "firstname" | "lastname" | "email" | "phone" | "object" | "message";
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

export function createContactFormSchema(t: (key: string) => string) {
  return z.object({
    firstname: z.string().min(1, { message: t("contactFirstNameRequired") }),
    lastname: z.string().min(1, { message: t("contactLastNameRequired") }),
    email: z.string().email({ message: t("contactEmailInvalid") }),
    phone: z.string(),
    object: z.string().min(1, { message: t("contactObjectRequired") }),
    message: z.string().min(1, { message: t("contactMessageRequired") }),
  });
}

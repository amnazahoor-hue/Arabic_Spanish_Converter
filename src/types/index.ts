import type { LanguageCode } from "@/lib/constants";

export type TranslateRequest = {
  text: string;
  from: LanguageCode;
  to: LanguageCode;
};

export type TranslateResponse = {
  translatedText: string;
  from: LanguageCode;
  to: LanguageCode;
};

export type TranslateErrorResponse = {
  error: string;
  code?:
    | "EMPTY_INPUT"
    | "VALIDATION"
    | "PROVIDER"
    | "UNSUPPORTED"
    | "QUOTA_DAILY"
    | "REQUEST_TOO_LARGE"
    | "NOT_CONFIGURED";
};

export type ContactFormData = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

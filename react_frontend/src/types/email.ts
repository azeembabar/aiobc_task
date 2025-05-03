export type EmailStatus = "Draft" | "Sent";

export interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  status: EmailStatus;
}

export interface EmailFormValues {
  to: string;
  subject: string;
  body: string;
}

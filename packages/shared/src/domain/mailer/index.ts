export interface ConfigMailer {
  host: string;
  port?: number;
  authUser: string;
  authPassword: string;
}

export interface Mailer {
  sendMail(options: unknown): Promise<void>;
}

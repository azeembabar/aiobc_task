const mainUrl = import.meta.env.VITE_API_URL || "http://localhost/aiobc_task/api";

export const GET_ALL_EMAILS_URL = `${mainUrl}/email-campaigns`;
export const POST_EMAIL_DATA_URL = `${mainUrl}/email-campaigns`;
export const SEND_EMAIL_URL = `${mainUrl}/email-campaigns`;

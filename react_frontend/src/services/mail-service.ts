import axios from "axios";
import {
  GET_ALL_EMAILS_URL,
  POST_EMAIL_DATA_URL,
  SEND_EMAIL_URL,
} from "./endpoints";

// interface EmailData {
//   subject: string;
//   body: string;
//   recipient: string;
// }

const postEmailData = async (emailData: any) => {
  const response = await axios.post(POST_EMAIL_DATA_URL, emailData);
  console.log(response.data);
  return response.data;
};

const getAllEmailData = async () => {
  const response = await axios.get(GET_ALL_EMAILS_URL);
  console.log(response.data);
  return response.data;
};

const sendAnEmail = async (id: any) => {
  const response = await axios.get(`${SEND_EMAIL_URL}/${id}/send`);
  console.log(response.data);
  return response.data;
};

export { postEmailData, getAllEmailData, sendAnEmail };

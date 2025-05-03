// import { useState } from "react";
// import { Email, EmailStatus } from "../types/email";

// export const useEmails = () => {
//   const [emails, setEmails] = useState<Email[]>([]);

//   const addEmail = (email: Omit<Email, "id" | "date" | "status">) => {
//     const newEmail: Email = {
//       id: Date.now().toString(),
//       ...email,
//       date: new Date().toLocaleString(),
//       status: "Draft",
//     };
//     setEmails((prev) => [...prev, newEmail]);
//   };

//   const sendEmail = (id: string) => {
//     setEmails((prev) =>
//       prev.map((email) =>
//         email.id === id ? { ...email, status: "Sent" } : email
//       )
//     );
//   };

//   return { emails, addEmail, sendEmail };
// };

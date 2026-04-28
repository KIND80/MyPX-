import { supabase } from "./supabase";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: {
        to,
        subject,
        html,
      },
    });

    if (error) {
      console.error("Erreur fonction Supabase:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Erreur envoi email:", err);
    return { success: false, error: err };
  }
};

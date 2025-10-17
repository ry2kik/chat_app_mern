import { resendClient, sender } from "../utils/resend.js"
import { createWelcomeEmailTemplate } from "./emailTempletes.js"

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to Chatify',
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if (error) {
        console.error("Failed to send welcome email: ", error);
        throw new Error("Failed to send welcome email");
    }

    console.log('Welcome Email send successfully', data);
}
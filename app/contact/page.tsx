"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      const result = await emailjs.sendForm(
        "service_id5rxw",
        "template_90mrlpn",
        formRef.current,
        "JzBCJK41sDIKxSKXQ"
      );

      console.log("SUCCESS:", result.text);
      alert("Message envoyé !");
      formRef.current.reset();
    } catch (error) {
      console.error("FAILED:", error);
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type="text" name="user_name" placeholder="Nom" required />
      <input type="email" name="user_email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Envoyer la demande</button>
    </form>
  );
}

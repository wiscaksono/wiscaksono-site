"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "@/lib/constants";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Contact from "../content/contact.mdx";

export default function Contacts() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        EMAILJS_PUBLIC_KEY
      );
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        form.current?.reset();
      }, 3000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <section className="md:grid md:grid-cols-2 h-full flex flex-col">
      <form
        ref={form}
        className="flex items-center justify-center p-5 md:border-r border-b border-lines flex-col gap-y-5 flex-1"
        onSubmit={sendEmail}
      >
        <div className="w-[80%] space-y-2">
          <Label htmlFor="name">_name</Label>
          <Input name="name" type="text" placeholder="John Doe" required />
        </div>

        <div className="w-[80%] space-y-2">
          <Label htmlFor="email">_email</Label>
          <Input
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            required
          />
        </div>

        <div className="w-[80%] space-y-2">
          <Label htmlFor="message">_message</Label>
          <Textarea
            name="message"
            placeholder="Hey! Just checked your website and it looks awesome!"
            required
          />
        </div>

        <div className="w-[80%] flex items-center gap-x-5">
          <Button
            type="submit"
            className="self-start"
            loading={isLoading}
            data-umami-event="Send email button"
          >
            send-message
          </Button>
          {isSuccess && (
            <p className="text-off-white text-xs animate-pulse">
              Your message will be sent to my email!
            </p>
          )}
        </div>
      </form>
      <div className="flex items-center justify-center flex-1 flex-grow-0">
        <Contact />
      </div>
    </section>
  );
}

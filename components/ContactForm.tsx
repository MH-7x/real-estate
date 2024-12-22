"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Name should be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  message: z.string().min(10, {
    message: "Message should be at least 10 characters long",
  }),
});

interface Main {
  message: string;
  success: boolean;
}

function ContactForm({
  propertyName,
  propertyImageUrl,
}: {
  propertyName: string;
  propertyImageUrl: string;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof contactSchema>) {
    try {
      setLoading(true);
      const fullData = {
        ...data,
        propertyName,
        propertyImageUrl,
      };

      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const resData: Main = await response.json();
      if (!resData.success) throw new Error(resData.message);
      form.reset();
      toast.success(resData.message || "Message sent successfully", {
        description: "We will contact you as soon as possible",
      });
    } catch (error) {
      //test purpose
      console.log("ERROR IN SUBMITTING FORM", error);
      toast.error(
        error instanceof Error ? error.message : "Something Went Wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={"grid grid-cols-1 gap-y-5 mt-8"}
      >
        <h3 className="font-semibold text-center text-muted-foreground">
          Send Message
        </h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="your name..."
                  type="text"
                  {...field}
                  className="col-span-2 bg-primary/5 border-none md:py-6"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="your email..."
                  type="email"
                  className="col-span-2 bg-primary/5 border-none md:py-6"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="your Phone number..."
                  type="number"
                  className="col-span-2 bg-primary/5 border-none md:py-6"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="your message..."
                  className="col-span-2 bg-primary/5 border-none"
                ></Textarea>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="w-80 mx-auto">
          {loading ? (
            <>
              {" "}
              Sending.. <Loader className="animate-spin" />
            </>
          ) : (
            <>
              {" "}
              Send Now <SendIcon />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ContactForm;

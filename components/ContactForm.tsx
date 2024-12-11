import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";

function ContactForm() {
  return (
    <form className={"grid grid-cols-1 gap-y-5 mt-8"}>
      <h3 className="font-semibold text-center text-muted-foreground">
        Send Message
      </h3>
      <Input
        name="name"
        placeholder="your name..."
        type="text"
        className="col-span-2 bg-primary/5 border-none md:py-6"
      />
      <Input
        name="email"
        placeholder="your email..."
        type="email"
        className="col-span-2 bg-primary/5 border-none md:py-6"
      />
      <Input
        name="phone"
        placeholder="your Phone number..."
        type="number"
        className="col-span-2 bg-primary/5 border-none md:py-6"
      />
      <Textarea
        name="message"
        placeholder="your message..."
        className="col-span-2 bg-primary/5 border-none"
      ></Textarea>
      <Button type="submit" className="w-80 mx-auto">
        Send Now <SendIcon />
      </Button>
    </form>
  );
}

export default ContactForm;

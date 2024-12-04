"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types/admin";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "please enter valid user name",
  }),
  password: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
});
export function InfoEditCard({ user }: { user: User }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      password: "",
    },
  });

  const onSubmit = async (FromValues: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...FromValues, id: user._id }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-4 gap-4 py-4 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="name"
            defaultValue={user.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="user name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="email"
            defaultValue={user.email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="new password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className={"col-span-4 mt-3"} type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}

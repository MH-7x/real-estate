"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { LoaderCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Enter Valid Name",
  }),
  password: z.string().min(2, {
    message: "enter valid password",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (FromValues: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FromValues),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full flex justify-center md:px-0 px-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-5 p-10 md:w-[500px] w-full bg-card z-50 rounded-3xl border-primary border shadow-2xl shadow-primary/30 h-max"
        >
          <h2 className="text-center">
            Create New <span className="text-primary ">Admin</span>
          </h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Name</FormLabel>
                <FormControl>
                  <Input placeholder="name..." {...field} />
                </FormControl>
                <FormDescription>vaild admin name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email address.." {...field} />
                </FormControl>
                <FormDescription>vaild admin email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>admin password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size={"lg"}
            disabled={loading}
            type="submit"
            className="w-full"
          >
            {!loading ? <LogIn /> : <LoaderCircle className="animate-spin" />}{" "}
            {loading ? "creating..." : "Add Now"}
          </Button>
        </form>
      </Form>
      <svg
        className="absolute left-0 -z-30 bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f3f4f6"
          fillOpacity="1"
          d="M0,128L48,154.7C96,181,192,235,288,218.7C384,203,480,117,576,112C672,107,768,181,864,213.3C960,245,1056,235,1152,202.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}

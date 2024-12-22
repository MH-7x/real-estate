import EmailTemplate from "@/components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyName: string;
  propertyImageUrl: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      propertyName,
      message,
      propertyImageUrl,
    }: RequestBody = await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !message ||
      !propertyName ||
      !propertyImageUrl
    ) {
      return NextResponse.json(
        {
          message: "All fields are required.",
          success: false,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing in environment variables.");
      return NextResponse.json(
        {
          message: "Server configuration error. Please contact support.",
          success: false,
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Send email
    const { error } = await resend.emails.send({
      to: "itsmashal2006@gmail.com",
      from: "Brighthome Support Center <onboarding@resend.dev>",
      subject: "New Message from Brighthome",
      react: EmailTemplate({
        name: sanitize(name),
        email: sanitize(email),
        phone: sanitize(phone),
        message: sanitize(message),
        propertyImgUrl: `${sanitize(propertyImageUrl)}`,
        propertyName: `${sanitize(propertyName)}`,
        Date: new Date(),
      }),
    });

    if (error) {
      console.error("Email sending error:", error);
      return NextResponse.json(
        {
          message: "Failed to send the email. Please try again later.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Your message has been sent successfully.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "An error occurred.",
        success: false,
      },
      { status: 500 }
    );
  }
}

function sanitize(input: string): string {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

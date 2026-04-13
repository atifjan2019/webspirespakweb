import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ─── Option 1: Resend (recommended) ─────────────────────────
    // npm install resend
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Webspires Contact Form <noreply@webspires.com.pk>",
    //   to: ["hello@webspires.com.pk"],
    //   subject: `New enquiry from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    //     <p><strong>Service:</strong> ${service || "Not specified"}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // ─── Option 2: Nodemailer (SMTP) ────────────────────────────
    // npm install nodemailer
    // Configure with your email provider SMTP settings

    // ─── Option 3: Formspree ────────────────────────────────────
    // Point form directly to https://formspree.io/f/YOUR_ID

    // For now, log to console (replace with your chosen option)
    console.log("Contact form submission:", { name, email, phone, service, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

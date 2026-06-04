"use server";

// 1. Import your newly created Admin client
import { supabaseAdmin } from "@/utils/supabase/admin";
import nodemailer from "nodemailer";

export async function submitBooking(formData: FormData) {
  try {
    // 2. Extract the text fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const appointmentTime = formData.get("appointmentTime") as string;
    const service = formData.get("service") as string;
    
    // 3. Extract the files
    const files = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    // 4. Upload images to Supabase Storage Bucket using the Admin Client
    for (const file of files) {
      if (file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from("booking-images")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error("Failed to upload image");
        }

        // Get the public URL for the database
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from("booking-images")
          .getPublicUrl(fileName);

        imageUrls.push(publicUrl);
      }
    }

    const formEntry = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          appt_time: appointmentTime,
          service: service,
          images: imageUrls,
        };

    // 5. Save everything to the Database using the Admin Client
    const { error: dbError } = await supabaseAdmin
      .from("bookings") 
      .insert([formEntry]);

    if (dbError) {
      console.error("DB error:", dbError);
      throw new Error("Failed to save to database");
    }

    // Format the date nicely for the email
    const formattedDate = new Date(formEntry.appt_time).toLocaleString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', 
      hour: 'numeric', minute: '2-digit', hour12: true
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email Template sent to the CLIENT
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #000; padding: 20px; text-align: center;">
          <h1 style="color: #F9D042; margin: 0;">Habibi Details</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff; color: #333;">
          <h2 style="color: #000; margin-top: 0;">Booking Received!</h2>
          <p>Hi ${formEntry.first_name},</p>
          <p>Thank you for choosing Habibi Details. We have successfully received your booking request!</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Service:</strong> ${formEntry.service}</p>
            <p style="margin: 5px 0;"><strong>Requested Time:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${formEntry.phone}</p>
          </div>
          <p>We will review your request and reach out to you shortly to confirm.</p>
          <p style="margin-bottom: 0;">Best regards,<br/>The Habibi Details Team</p>
        </div>
      </div>
    `;

    // Email Template sent to YOU (The Admin)
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #000; border-radius: 10px; padding: 20px;">
        <h2 style="color: #e63946; margin-top: 0;">🚨 New Booking Request</h2>
        <p><strong>Name:</strong> ${formEntry.first_name} ${formEntry.last_name}</p>
        <p><strong>Service:</strong> ${formEntry.service}</p>
        <p><strong>Time:</strong> ${formattedDate}</p>
        <p><strong>Phone:</strong> <a href="tel:${formEntry.phone}">${formEntry.phone}</a></p>
        <p><strong>Email:</strong> <a href="mailto:${formEntry.email}">${formEntry.email}</a></p>
        <p><strong>Photos Uploaded:</strong> ${formEntry.images.length}</p>
        <br/>
        <a href="https://www.habibisdetail.com/admin" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View in Admin Portal</a>
      </div>
    `;

    // Send to Client
    await transporter.sendMail({
      from: `"Habibi Details" <${process.env.GMAIL_USER}>`,
      to: formEntry.email,
      subject: "Booking Received - Habibi Details",
      html: clientHtml,
    });

    // Send to Admin (Yourself)
    await transporter.sendMail({
      from: `"Habibi Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Sends it to your own inbox
      subject: `New Booking: ${formEntry.first_name} ${formEntry.last_name} - ${formEntry.service}`,
      html: adminHtml,
    });

    return { success: true, data: formEntry };

  } catch (error) {
    console.error("Booking submission error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
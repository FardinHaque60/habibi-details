"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;

  if (password === process.env.ADMIN_PASSWORD) {
    // Calculate exactly 3 days from now
    const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    
    // Set a secure, HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expires,
      path: "/",
    });
  } else {
    return { error: "Invalid password" };
  }

  // Redirect to the dashboard
  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
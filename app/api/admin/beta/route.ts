import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

function generateToken(length: number): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export async function GET() {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const adminEmails = ["martin@ratee.me", "martincavil.dev@gmail.com"];
    if (!user || !adminEmails.includes(user.email || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all beta invites
    const { data, error } = await supabase
      .from("beta_invites")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const adminEmails = ["martin@ratee.me", "martincavil.dev@gmail.com"];
    if (!user || !adminEmails.includes(user.email || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, action, id } = body;

    // Handle different actions
    if (action === "create") {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      const token = generateToken(32);

      const { data, error } = await supabase.from("beta_invites").insert({
        email: email.toLowerCase().trim(),
        token,
        status: "pending",
      }).select().single();

      if (error) throw error;

      return NextResponse.json({ data, token });
    }

    if (action === "delete") {
      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }

      const { error } = await supabase.from("beta_invites").delete().eq("id", id);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get email automation stats
    const { data: emailStats, error: statsError } = await supabase
      .from("email_automations")
      .select("*")
      .eq("user_id", user.id);

    if (statsError) {
      throw statsError;
    }

    // Count sent emails
    const sent = emailStats?.filter((e) => e.status === "sent").length || 0;

    // Count scheduled emails (projects that will trigger emails)
    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .not("completed_at", "is", null);

    // Calculate how many emails are scheduled
    let scheduled = 0;
    const today = new Date();

    projects?.forEach((project) => {
      if (project.completed_at) {
        const completedDate = new Date(project.completed_at);
        const daysSince = Math.floor(
          (today.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Check if onboarding not sent
        if (!project.automation_onboarding_sent) {
          scheduled++;
        }
        // Check if 30 days passed but not sent
        if (daysSince >= 30 && !project.automation_30days_sent) {
          scheduled++;
        }
        // Check if 90 days passed but not sent
        if (daysSince >= 90 && !project.automation_90days_sent) {
          scheduled++;
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        sent,
        scheduled,
      },
    });
  } catch (error) {
    console.error("Error fetching email stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

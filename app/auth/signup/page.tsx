import { SignupForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - ratee.me",
  description: "Créez votre compte ratee.me et commencez à collecter des feedbacks clients",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}

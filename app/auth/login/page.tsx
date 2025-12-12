import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - ratee.me",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

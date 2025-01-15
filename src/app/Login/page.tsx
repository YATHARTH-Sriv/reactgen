import Image from "next/image";
import { UserAuthForm } from "./(user-auth-form)";

function LoginPage() {
  return (
    <div className="container flex h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}

export default LoginPage;

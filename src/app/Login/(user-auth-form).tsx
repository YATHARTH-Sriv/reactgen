"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { signIn } from "next-auth/react";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/newdash" });
    setIsLoading(false);
  };

  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
      >
        {isLoading ? (
          <ImSpinner9 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}
        Continue with Google
      </Button>
    </div>
  );
}

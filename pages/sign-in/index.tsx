import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface SignInQueryParams {
  callbackUrl?: string;
  error?: string;
}

const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { callbackUrl, error } = router.query as SignInQueryParams;
  const [hasAttemptedSignIn, setHasAttemptedSignIn] = useState<boolean>(false);

  useEffect(() => {
    if (status === "loading") return;

    if (error) {
      console.log("Auth error from query:", error);
      if (window.opener) {
        window.opener.postMessage(
          { type: "SIGN_IN_FAILED", error },
          "*"
        );
        setTimeout(() => {
          console.log("Closing popup on error...");
          window.close();
        }, 500);
      } else {
        router.push(callbackUrl || "/");
      }
      return;
    }

    const handleSignIn = async () => {
      if (status === "unauthenticated" && !hasAttemptedSignIn) {
        setHasAttemptedSignIn(true);
        try {
          await signIn("google", { redirect: false });
        } catch (err) {
          const errorMessage = (err as Error).message || "Unknown error";
          console.log("Sign-in error:", err);
          if (window.opener) {
            window.opener.postMessage(
              { type: "SIGN_IN_FAILED", error: errorMessage },
              "*"
            );
            setTimeout(() => {
              console.log("Closing popup on sign-in error...");
              window.close();
              console.log("Popup closed:", window.closed);
            }, 500);
          } else {
            router.push(callbackUrl || "/");
          }
        }
      } else if (status === "authenticated") {
        if (window.opener) {
          window.opener.postMessage({ type: "SIGN_IN_SUCCESS" }, "*");
          setTimeout(() => {
            console.log("Closing popup on success...");
            window.close();
            console.log("Popup closed:", window.closed);
          }, 500);
        } else {
          router.push(callbackUrl || "/");
        }
      }
    };

    handleSignIn();
  }, [status, callbackUrl, error, hasAttemptedSignIn, router]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    />
  );
};

SignInPage.layout = "virtual";

export default SignInPage;
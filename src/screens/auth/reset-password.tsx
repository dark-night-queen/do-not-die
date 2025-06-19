import React, {useEffect, useState} from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ResetPassword } from "./_components/reset-password";
import Layout from "./_layout";

export default () => {
  //   const router = useRouter();
  const { setShowLoader } = useAuthStore();
  const [authParams, setAuthParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Get the hash fragment from the URL
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.substring(1)
      : window.location.hash;
    const params = new URLSearchParams(hash);
    const parsed: { [key: string]: string } = {};
    params.forEach((value, key) => {
      parsed[key] = value;
    });
    setAuthParams(parsed);
    // Optionally, you can log or use these params
    console.log("Auth Params:", parsed);
  }, []);

  // Now you can access tokens like:
  // authParams.access_token, authParams.refresh_token, etc.

  const handleSubmit = async (password: string) => {
    setShowLoader("forget-password", true);

    // const session = await getSession();
    // console.log("first", session);
    // await supabase.auth.updateUser({ password });
    setShowLoader("forget-password", false);
  };

  return (
    <Layout>
      <ResetPassword handleSubmit={handleSubmit} />
    </Layout>
  );
};

import { useSession } from "next-auth/client";
import router from "next/router";

export default function Admin() {
  const [session, loading] = useSession();
  if (loading) {
    return null;
  }
  if (!loading && !session) {
    router.push("/");
  }

  return <p>Protected Route</p>;
}

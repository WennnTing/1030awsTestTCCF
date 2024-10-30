import AuthForm from "@/components/frontend/auth-form";
import AuthHeader from "@/components/frontend/auth-header";
import { redirect } from "../../../../navigation";
import { getCookies } from "@/actions/auth";

export default async function HomePage() {
  const auth = await getCookies();

  if (auth) {
    return redirect("/backend/content/article-list");
  }
  return (
    <>
      <AuthHeader />
      <AuthForm />
    </>
  );
}

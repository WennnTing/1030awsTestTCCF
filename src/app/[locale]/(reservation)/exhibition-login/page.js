import AuthForm from "@/components/reservation/auth-form";
import AuthHeader from "@/components/reservation/auth-header";
import { getExhibitionCookies } from "@/actions/auth";
import { redirect } from "../../../../navigation";

export default async function LoginPage() {
  const auth = await getExhibitionCookies();
  if (auth) {
    return redirect("/exhibition/memberInfo");
  }

  return (
    <div className="reservation-auth-layout">
      <AuthHeader />
      <AuthForm />
    </div>
  );
}

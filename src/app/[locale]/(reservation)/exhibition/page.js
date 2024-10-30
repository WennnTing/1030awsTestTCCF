import { getExhibitionCookies } from "@/actions/auth";
import { redirect } from "../../../../navigation";

export default async function ExhibitionHomePage() {
  const auth = await getExhibitionCookies();

  if (auth) {
    return redirect("/exhibition/memberInfo");
  } else {
    return redirect("/exhibition-login");
  }
}

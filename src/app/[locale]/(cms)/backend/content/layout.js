import { getCookies } from "@/actions/auth";
import { redirect } from "../../../../../navigation";
export default async function Layout({ children }) {
  const auth = await getCookies();

  if (auth === undefined) {
    return redirect("/backend");
  }

  return <>{children}</>;
}

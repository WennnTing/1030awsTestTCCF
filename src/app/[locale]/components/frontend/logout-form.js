"use client";
import { logoutByAdmin } from "@/actions/login";
import { useFormState } from "react-dom";
import LogoutFormSubmit from "./logout-form-submit";

export default function LogoutForm({ data }) {
  const [state, formAction] = useFormState(logoutByAdmin, {});
  return (
    <form action={formAction}>
      <LogoutFormSubmit data={data} />
    </form>
  );
}

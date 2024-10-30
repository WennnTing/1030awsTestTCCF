import { UserProvider } from "@/context/exhibition/UserContext";
export default function Layout({ children }) {
  return (
    <UserProvider>
      <div className="reservation-layout">{children}</div>
    </UserProvider>
  );
}

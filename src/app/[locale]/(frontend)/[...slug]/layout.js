import MainHeader from "@/components/frontend/main-header";
import MainFooter from "@/components/frontend/main-footer";

export default function PageLayout({ children }) {
  return (
    <div className="frontend-layout-wrapper">
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}

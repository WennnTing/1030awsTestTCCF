// import Sidebar from "../components/Sidebar";
import ExhibitionAuthLayout from "../exhibition-backend/ExhibitionAuthLayout";
export default function Layout({ children }) {
  return (
    <ExhibitionAuthLayout>
      <div className="layoutWrapper">
        <div className="layoutWrapper__container">{children}</div>
      </div>
    </ExhibitionAuthLayout>
  );
}

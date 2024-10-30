import Sidebar from "../exhibition-backend/_components/Sidebar/Sidebar";
import ExhibitionBackendLayout from "./ExhibitionBackendLayout";
import { ExhibitionBackendProvider } from "@/context/exhibition/ExhibitionBackendContext";

import ExhibitionBackendHeader from "./_components/Header/ExhibitionBackendHeader";

export default function Layout({ children }) {
  return (
    <ExhibitionBackendProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh"
        }}>
        <ExhibitionBackendHeader
          style={{
            position: "relative",
            zIndex: 2
          }}
        />
        <div style={{
          display: "flex",
          flex: 1,
          overflow: "hidden"
        }}>
          <Sidebar
            style={{
              position: "relative",
              zIndex: 1
            }} />
          <div style={{ flex: 1, overflowY: "auto" }}>
            {children}
          </div>
        </div>
      </div>
    </ExhibitionBackendProvider>
  );
}

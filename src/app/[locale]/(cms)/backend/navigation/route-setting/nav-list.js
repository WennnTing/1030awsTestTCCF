import Nav from "./nav";
import { getAllHeaders } from "@/actions/header";
import { getAllSidebars } from "@/actions/sidebar";
import { getAllBranches } from "@/actions/branch";
import { getAllFooters } from "@/actions/footer";

export default async function NavList() {
  const headers = await getAllHeaders();
  const sidebars = await getAllSidebars();
  const footers = await getAllFooters();
  const branches = await getAllBranches();

  return (
    <Nav
      headers={headers}
      sidebars={sidebars}
      footers={footers}
      branches={branches}
    />
  );
}

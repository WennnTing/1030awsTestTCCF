"use client";

import { Link } from "../../../../navigation";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, type, index }) {
  const path = usePathname();

  const pathSegments = path.split("/");
  const hrefSegments = href.split("/");

  const isActive = hrefSegments.every((segment) =>
    pathSegments.includes(segment)
  );

  const colorList = ["#33A6B8", "#50be9c", "#f69451", "#f5adcc"];
  const colorIndex = index % colorList.length;
  const color = colorList[colorIndex];
  return (
    <Link
      href={`/${href}`}
      style={{
        fontWeight: isActive && !type ? "600" : "400",
        color:
          isActive && type === "header"
            ? color
            : type === "footer"
            ? isActive
              ? "#50be9c"
              : "#fff"
            : "#171717",
      }}
    >
      {children}
    </Link>
  );
}

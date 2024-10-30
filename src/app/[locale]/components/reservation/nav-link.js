"use client";
import { Link } from "../../../../navigation";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  const pathSegments = path.split("/");
  const hrefSegments = href.split("/");

  const isActive = hrefSegments.every((segment) =>
    pathSegments.includes(segment)
  );

  return (
    <Link
      href={`/${href}`}
      style={{
        color: isActive ? "#51BA97" : "",
      }}
    >
      {children}
    </Link>
  );
}

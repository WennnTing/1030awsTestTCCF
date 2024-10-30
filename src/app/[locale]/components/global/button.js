import { Link } from "../../../../navigation";
export default function Button({
  linkText,
  link,
  blank,
  download,
  btntype,
  onClick,
}) {
  if (link) {
    return (
      <Link
        href={link}
        className={`button ${btntype === "auth" ? "button--auth" : ""}`}
        target={blank ? "_blank" : "_self"}
        download={download ? true : false}
      >
        {linkText}
      </Link>
    );
  }

  return (
    <button
      className={`button ${btntype === "auth" ? "button--auth" : ""}`}
      onClick={onClick}
    >
      {linkText}
    </button>
  );
}

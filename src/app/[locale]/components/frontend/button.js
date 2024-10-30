import { Link } from "../../../../navigation";
import styles from "./button.module.scss";
export default function Button({ text, href, blank }) {
  return (
    <Link href={href} className={styles.button} target={blank ? "_blank" : ""}>
      {text}
    </Link>
  );
}

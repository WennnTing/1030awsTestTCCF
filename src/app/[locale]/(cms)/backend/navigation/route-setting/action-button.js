import { RxPlus } from "react-icons/rx";
import { BsPencil } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import styles from "./navigation.module.scss";
export default function ActionButton({ onClickFun, type }) {
  return (
    <div
      onClick={onClickFun}
      className={
        styles.cmsNavigation__container_list__item_container__action_icon
      }
    >
      {type === "increase" ? <RxPlus /> : <BsTrash3 />}
    </div>
  );
}

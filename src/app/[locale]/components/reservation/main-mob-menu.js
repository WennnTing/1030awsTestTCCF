import styles from "./main-mob-menu.module.scss";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineInbox } from "react-icons/hi2";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { Link } from "../../../../navigation";
import { _getCompanyByUserId } from "@/actions/_company";
import { _getProjectByMemberId } from "@/actions/_project";
import { _getUserProfile } from "@/actions/auth";
import LocaleSwitcher from "./locale-switcher";
import UserActionList from "./user-action-list";

export default async function MainMobMenu() {
  const profile = await _getUserProfile();
  let path;
  if (profile.roles.includes("Pitching")) {
    const project = await _getProjectByMemberId(profile?.userId);
    path = `preview/project/${project.projectId}`;
  } else {
    const company = await _getCompanyByUserId(profile?.userId);
    path = `preview/market/${company?.data?.[0]?.companyId}`;
  }
  const LinkData = [
    {
      id: 1,
      name: "Information",
      href: "exhibitioninfo",
      icon: <HiOutlineSquaresPlus />,
    },
    {
      id: 2,
      name: "Appointments",
      href: "meeting-unopened",
      icon: <HiOutlineChatBubbleLeftRight />,
    },

    {
      id: 3,
      name: "Activities",
      href: "activities",
      icon: <HiOutlineInbox />,
    },
    {
      id: 4,
      name: "Preview",
      href: path,
      icon: <HiOutlineDocumentMagnifyingGlass />,
    },
  ];

  return (
    <div className="reservationMobMenu">
      <div className={styles.reservationMainMobMenu}>
        <div className={styles.reservationMainMobMenu__container}>
          <ul className={styles.reservationMainMobMenu__container_list}>
            {LinkData.map((data) => (
              <li
                key={data.id}
                className={styles.reservationMainMobMenu__container_list__item}
              >
                <Link href={`/exhibition/${data.href}`}>
                  <div
                    className={
                      styles.reservationMainMobMenu__container_list__item_icon
                    }
                  >
                    {data.icon}
                  </div>
                  <div
                    className={
                      styles.reservationMainMobMenu__container_list__item_text
                    }
                  >
                    {data.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.reservationMainMobMenu__container_function}>
            <div
              className={
                styles.reservationMainMobMenu__container_function__item
              }
            >
              <LocaleSwitcher />
            </div>
            <div
              className={
                styles.reservationMainMobMenu__container_function__item
              }
            >
              <UserActionList data={profile} type={"mob"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

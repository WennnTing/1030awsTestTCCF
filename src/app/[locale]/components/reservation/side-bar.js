import styles from "./side-bar.module.scss";
import NavLink from "./nav-link";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineInbox } from "react-icons/hi2";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { _getUserProfile } from "@/actions/auth";
import { _getCompanyByUserId } from "@/actions/_company";
import { _getProjectByMemberId } from "@/actions/_project";
import { Link } from "../../../../navigation";
import { _getMeetingCalendar } from "@/actions/_meeting-detail";
import { _getMeetingTimeLimit } from "@/actions/_meeting-reservation";
export default async function SideBar() {
  const events = await _getMeetingCalendar();
  const meetingTimeLimit = await _getMeetingTimeLimit();

  const showRedDot = events.length === 0 && meetingTimeLimit == 0;

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
      showRedDot: showRedDot,
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
    <div className={styles.reservationSideBar}>
      <div className={styles.reservationSideBar__logo}>
        <Link href="/" target="_blank">
          <img
            src={"/images/logo_black.svg"}
            alt={"logo"}
            sizes={"100%"}
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
      </div>

      <ul className={styles.reservationSideBar__list}>
        {LinkData.map((data) => (
          <li key={data.id} className={styles.reservationSideBar__list_item}>
            <NavLink href={`exhibition/${data.href}`}>
              <div className={styles.reservationSideBar__list_item__icon}>
                {data.icon}
                {data.showRedDot && (
                  <span className={styles.reservationSideBar__redDot}></span>
                )}
              </div>
              {data.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* <div className={styles.reservationSideBar__cms}>
        <NavLink
          className={styles.reservationSideBar__cms_container}
          href={`backend`}
        >
          <div className={styles.reservationSideBar__cms_container__icon}>
            <HiOutlineSquare3Stack3D />
          </div>
          <div className={styles.reservationSideBar__cms_container__text}>
            TCCF CMS
          </div>
        </NavLink>
      </div> */}
    </div>
  );
}

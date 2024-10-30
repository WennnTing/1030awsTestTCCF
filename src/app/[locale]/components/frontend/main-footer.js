import NavLink from "./nav-link";
import SubscribeForm from "./SubscribeForm";
import styles from "./main-footer.module.scss";
import { getAllFooters, _getAllVisibleFooters } from "@/actions/footer";
import { localeToUpperCase } from "@/utils";
import { getLocale } from "next-intl/server";
import { Link } from "../../../../navigation";

// socail buttons
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default async function MainFooter() {
  const footers = await _getAllVisibleFooters();
  const locale = localeToUpperCase(await getLocale());

  return (
    <footer className={styles.mainFooter}>
      <div className={styles.mainFooter__container}>
        <div className={styles.mainFooter__container_listWrapper}>
          <div className={styles.mainFooter__container_listWrapper__logo}>
            <img
              src={"/images/logo_white.svg"}
              alt={"logo"}
              sizes={"100%"}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <ul className={styles.mainFooter__container_listWrapper__menu}>
            <SubscribeForm />
            {footers.data.map((footer) => (
              <li key={footer.footerId}>
                <NavLink href={footer.routerName} type={"footer"}>
                  {footer[`footerName${locale}`]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mainFooter__container_socialWrapper}>
          <a href="mailto:contact@tccf.tw">
            <span>contact@tccf.tw</span>
          </a>

          <ul className={styles.mainFooter__container_socialWrapper__social}>
            <li>
              <Link href="https://www.instagram.com/taicca.tw/" target="_blank">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/TCCFTaiwanCreativeContentFest/"
                target="_blank"
              >
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/82535470/"
                target="_blank"
              >
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link href="https://x.com/TAICCA_Official" target="_blank">
                <FaXTwitter />
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.mainFooter__container_copyRightWrapper}>
          <div
            className={styles.mainFooter__container_copyRightWrapper__copyRight}
          >
            Copyright © TAICCA (Taiwan Creative Content Agency). All rights
            reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Fragment, Suspense } from "react";
import LoadingScreen from "@/components/reservation/loading-screen";
import { _checkUserCalendarPermissions } from "@/actions/_meeting-reservation";
import { getExhibitionCookies } from "@/actions/auth";
import { redirect } from "../../../../../navigation";
import { _getUserProfile } from "@/actions/auth";
export default async function MeetingLayout({ permissions, children }) {
  const auth = await getExhibitionCookies();
  const roleData = await _getUserProfile();

  if (auth === undefined) {
    return redirect("/exhibition");
  }
  const allowedRoles = [
    "Market",
    "Pitching",
    "Buyer",
    "Speaker",
    "VIP",
    "Award Sponsor",
    "Professional",
    "Decision Maker",
    "Press",
  ];

  const hasAccess =
    roleData.hasExhibitPass &&
    roleData.roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return redirect("/exhibition/meeting-unopened");
  }

  const permissionStatus = await _checkUserCalendarPermissions();

  return (
    <Fragment>
      {permissionStatus === true ? (
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      ) : (
        <Suspense fallback={<LoadingScreen />}>{permissions}</Suspense>
      )}
    </Fragment>
  );
}

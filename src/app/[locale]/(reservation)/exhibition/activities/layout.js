import { Fragment, Suspense } from "react";
import LoadingScreen from "@/components/reservation/loading-screen";
import { _checkUserCalendarPermissions } from "@/actions/_meeting-reservation";
import { getExhibitionCookies } from "@/actions/auth";
import { redirect } from "../../../../../navigation";

export default async function MeetingLayout({ permissions, children }) {
  const auth = await getExhibitionCookies();
  if (auth === undefined) {
    return redirect("/exhibition");
  }
  const permissionStatus = await _checkUserCalendarPermissions();

  return (
    <Fragment>
      {/* {permissionStatus === true ? (
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      ) : (
        <Suspense fallback={<LoadingScreen />}>{permissions}</Suspense>
      )} */}

      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
    </Fragment>
  );
}

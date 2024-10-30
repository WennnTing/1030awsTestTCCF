import { NextResponse } from "next/server";
import moment from "moment-timezone";
export const GET = async () => {
  const serverTime = moment().tz("Asia/Taipei").format("YYYY-MM-DD");
  return NextResponse.json({ serverTime });
};

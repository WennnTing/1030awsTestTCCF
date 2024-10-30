import moment from "moment-timezone";
export default function Page() {
  return (
    <div>
      <h1>{moment().tz("Asia/Taipei").format("YYYY-MM-DD HH:mm:ss")}</h1>
    </div>
  );
}

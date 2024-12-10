import moment from "moment";
export default function formatDate(dbDate: Date): string {
  const date = new Date(dbDate);
  return moment(date).format("DD MMM, YYYY");
}

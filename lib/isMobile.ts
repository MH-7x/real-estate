"use server";
import { headers } from "next/headers";

export async function isMobile() {
  const ReqHeaders = headers();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(
    (await ReqHeaders).get("user-agent") || ""
  );
  return isMobile;
}

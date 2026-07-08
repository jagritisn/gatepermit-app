import { redirect } from "next/navigation";

// The app entry point launches into the visitor flow. /visitor routes intelligently:
// no session -> the login screen (mobile number), an active request -> its status/pass.
export default function RootPage() {
  redirect("/visitor");
}

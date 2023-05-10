import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    throw redirect(
      `/login?redirectTo=${pathname}&message=you must log in first`
    );
  }
  return null;
}

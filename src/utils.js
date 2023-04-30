import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw window.location.replace("/login?message=you must log in first");
  }
  return null;
}

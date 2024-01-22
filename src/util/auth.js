import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
  return null;
}

export function checkAdminLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
  const role = jwtDecode(token).role;

  if (role !== "Admin") {
    return redirect("/");
  }
  return null;
}

export function checkIsLoggedIn() {
  var isLoggedIn = false;
  if (localStorage.getItem("token")) {
    const jwt = jwtDecode(localStorage.getItem("token"));
    isLoggedIn = jwt.unique_name !== null ? true : false;
  }
  if (isLoggedIn) {
    return redirect("/");
  }
  return null;
}

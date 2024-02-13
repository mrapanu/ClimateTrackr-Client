import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
}

export function getUsernameFromToken() {
  if (localStorage.getItem("token") !== null) {
    const jwt = jwtDecode(localStorage.getItem("token"));
    return jwt.unique_name;
  } else {
    return null;
  }
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

export const checkExpiredJwt = (exp, dispatch, navigate, date) => {
  if (exp && exp < date) {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }
};

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

import LoginForm from "../components/Forms/LoginForm";
import { json, redirect } from "react-router-dom";
import PageContent from "../layout/PageContent";

const LoginPage = () => {
  return (
    <PageContent isHome={false}>
      <LoginForm />
    </PageContent>
  );
};
export default LoginPage;

export async function loginAction({ request }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch(`${apiUrl}Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.data;
  resData.success && localStorage.setItem("token", token);

  return redirect("/");
}

import {
  useLoaderData,
  useNavigation,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { loginUser } from "../api";

export const loader = ({ request }) => {
  const message = new URL(request.url).searchParams.get("message");
  return message;
};
async function fakeLoginUser(creds) {
  const res = await loginUser(creds);
  return res;
}
export const action = async ({ request }) => {
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const res = await fakeLoginUser({ email, password });
    if (!res) {
      throw new Error("Invalid credential");
    } else {
      return redirect(pathname);
    }
  } catch (error) {
    console.log({ error: error.message });
    return error.message;
  }
};

const Login = () => {
  const message = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();
  return (
    <div className="login-container">
      <h2 className="red">{message}</h2>
      <h1>Sign in to your account</h1>
      {error && <h2 className="red">{error}</h2>}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in " : "Log in"}
        </button>
      </Form>
    </div>
  );
};
export default Login;

import {
  useLoaderData,
  useNavigation,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";

const loader = ({ request }) => {
  const message = new URL(request.url).searchParams.get("message");

  return message;
};
async function fakeLoginUser(creds) {
  await new Promise((done) => setTimeout(() => done(), 1000));
  if (creds.email === "b@b.com" && creds.password === "p123") {
    localStorage.setItem("loggedin", true);

    return {
      email: creds.email,
      token: "1234567890abcdef",
    };
  }
  throw new Error("Couldn't log the user in");
}
const action = async ({ request }) => {
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await fakeLoginUser({ email, password });
    localStorage.setItem("isLoggedIn", true);

    return redirect(pathname);
  } catch (error) {
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
export { loader, action };
export default Login;

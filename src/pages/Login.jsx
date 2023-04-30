import { useState, useRef, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { loginUser } from "../api";

const loader = ({ request }) => {
  const message = new URL(request.url).searchParams.get("message");
  return message;
};

const Login = () => {
  const message = useLoaderData();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const submitRef = useRef(null);
  useEffect(() => {
    if (status === "submitting") {
      submitRef.disabled = true;
    }
  }, [status]);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(loginFormData)
      .then((resp) => console.log(resp))
      .catch((err) => setError(err))
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <h2 className="red">{message}</h2>
      <h1>Sign in to your account</h1>
      {error && <h2>{error?.message}</h2>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in " : "Log in"}
        </button>
      </form>
    </div>
  );
};
export { loader };
export default Login;

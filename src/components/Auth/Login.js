import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickBtnLogin = async () => {
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <section className="login-header">
        <span>Don't have an account yet?</span>
        <button className="btn btn-outline-dark">Sign up</button>
        <a href="#!" className="text-secondary">
          Contact us
        </a>
      </section>
      <section className="col-3 container mt-4 login-content">
        <h1 className="text-center">QuizFun</h1>
        <span className="text-center d-block mt-4">Hello, who’s this?</span>
        <form action="#!">
          <div>
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="abc@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="*****"
            />
          </div>
        </form>
        <a href="#!" className="text-secondary mt-3 d-block">
          Forgot password?
        </a>
        <div className="btn-groups">
          <button
            className="btn btn-dark"
            onClick={() => handleClickBtnLogin()}
          >
            Log in to QuizFun
          </button>
          <div className="btn-decoration">
            <div></div>
            <span>OR</span>
          </div>
          <button className="btn btn-outline-dark d-flex justify-content-center align-items-center gap-2">
            <FcGoogle /> Log in with Google
          </button>
          <button className="btn btn-outline-dark mt-2 d-flex justify-content-center align-items-center gap-2">
            <FaMicrosoft /> Log in with Microsoft
          </button>
          <a
            href="#!"
            className="text-secondary mt-3 d-block text-center"
            onClick={() => navigate("/")}
          >
            Go back to Home
          </a>
        </div>
      </section>
    </div>
  );
};

export default Login;

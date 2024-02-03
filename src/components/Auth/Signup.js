import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { postSignup } from "../../services/apiServices";
import { IoMdEyeOff } from "react-icons/io";
import Language from "../Header/Language";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClickBtnSignup = async () => {
    const isValidate = validateEmail(email);
    if (!isValidate) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Please enter password!");
    }
    if (!username) {
      toast.error("Please enter username!");
    }

    let data = await postSignup(email, username, password);
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
        <span>Already have an account?</span>
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
        <Language></Language>
      </section>
      <section className="col-3 container mt-4 login-content">
        <h1 className="text-center">QuizFun</h1>
        <span className="text-center d-block mt-4">Start your journey?</span>
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
          <div className="pass-group">
            <label htmlFor="login-password">Password</label>
            <input
              type={!isShowPassword ? "password" : "text"}
              id="login-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="*****"
            />
            {isShowPassword ? (
              <span
                className="eye-icon"
                onClick={() => setIsShowPassword(false)}
              >
                <FaEye />
              </span>
            ) : (
              <span
                className="eye-icon"
                onClick={() => setIsShowPassword(true)}
              >
                <IoMdEyeOff />
              </span>
            )}
          </div>
          <div>
            <label htmlFor="login-username">Username</label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </form>
        <div className="btn-groups">
          <button
            className="btn btn-dark"
            onClick={() => handleClickBtnSignup()}
          >
            Create my free account
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

export default Signup;

import VideoHomePage from "../../assets/video/video-homepage.mp4";
import { useSelector } from "react-redux";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={VideoHomePage} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="homepage-content container col-4">
        <h1>Forms that break the norm</h1>
        <p>
          Get more data—like signups, feedback, and anything else—with forms
          designed to be <strong>refreshingly different.</strong>
        </p>
        {isAuthenticated === false ? (
          <button className="btn btn-dark" onClick={() => navigate("/login")}>
            Get started-It's free
          </button>
        ) : (
          <button className="btn btn-dark" onClick={() => navigate("/users")}>
            Get your quiz
          </button>
        )}
      </div>
    </div>
  );
};
export default HomePage;

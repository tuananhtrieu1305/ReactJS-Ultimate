import VideoHomePage from "../../assets/video/video-homepage.mp4";
import { useSelector } from "react-redux";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={VideoHomePage} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="homepage_content container col-4">
        <h1 className="homepage_title">
          {t("homepage_content.homepage_title")}
        </h1>
        <p className="homepage_desc">
          {t("homepage_content.homepage_desc")}
          <strong className="homepage_desc_2">
            {t("homepage_content.homepage_desc_2")}
          </strong>
        </p>
        {isAuthenticated === false ? (
          <button
            className="btn btn-dark homepage_start"
            onClick={() => navigate("/login")}
          >
            {t("homepage_content.homepage_start")}
          </button>
        ) : (
          <button
            className="btn btn-dark homepage_get_quiz"
            onClick={() => navigate("/users")}
          >
            {t("homepage_content.homepage_get_quiz")}
          </button>
        )}
      </div>
    </div>
  );
};
export default HomePage;

import VideoHomePage from "../../assets/video/video-homepage.mp4";
import "./HomePage.scss";

const HomePage = () => {
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
        <button className="btn btn-dark">Get started-It's free</button>
      </div>
    </div>
  );
};
export default HomePage;

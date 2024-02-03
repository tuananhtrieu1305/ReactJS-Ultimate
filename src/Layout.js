import App from "./App";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUser from "./components/Admin/Content/ManageUser";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Auth/Signup";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Questions/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from "react";

const NotFound = () => {
  return (
    <div className="alert alert-danger container text-center mt-3">
      404 NOT FOUND
    </div>
  );
};
const Layout = () => {
  return (
    <Suspense fallback="...is loading">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage></HomePage>} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz></DetailQuiz>} />
        <Route
          path="/admins"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard></DashBoard>} />
          <Route path="manage-users" element={<ManageUser></ManageUser>} />
          <Route path="manage-quizzes" element={<ManageQuiz></ManageQuiz>} />
          <Route path="manage-questions" element={<Questions></Questions>} />
        </Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;

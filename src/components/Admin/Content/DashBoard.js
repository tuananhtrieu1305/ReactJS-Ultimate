import { useEffect, useState } from "react";
import "./DashBoard.scss";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../../services/apiServices";

const DashBoard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      let Us = res?.DT?.users?.countUsers ?? 0;
      let Qz = res?.DT?.others?.countQuiz ?? 0;
      let Qs = res?.DT?.others?.countQuestions ?? 0;
      let As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Users",
          Us: Us,
        },
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="mb-4">Analytics Dashboard</h2>
      <section className="dashboard-content">
        <section className="c-left">
          <div className="board">
            <span className="board-name">Total Users</span>
            <span className="board-stats">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.countUsers ? (
                <>{dataOverview.users.countUsers}</>
              ) : (
                <>--</>
              )}
            </span>
          </div>
          <div className="board">
            <span className="board-name">Total Quizzes</span>
            <span className="board-stats">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>--</>
              )}
            </span>
          </div>
          <div className="board">
            <span className="board-name">Total Questions</span>
            <span className="board-stats">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>--</>
              )}
            </span>
          </div>
          <div className="board">
            <span className="board-name">Total Answers</span>
            <span className="board-stats">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>--</>
              )}
            </span>
          </div>
        </section>
        <section className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Us" fill="#8884d8" />
              <Bar dataKey="Qz" fill="#82ca9d" />
              <Bar dataKey="Qs" fill="#FF6651" />
              <Bar dataKey="As" fill="#6A5AF9" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </section>
    </div>
  );
};
export default DashBoard;

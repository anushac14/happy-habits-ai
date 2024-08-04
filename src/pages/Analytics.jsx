import AnalyticsStatCard from "../Components/AnalyticsStatCard";
import TopBar from "../Components/TopBar";
import SleepIcon from "../assets/sleep.png";
import NutritionIcon from "../assets/nutrition.png";
import PhysicalIcon from "../assets/physical.png";
import MentalIcon from "../assets/mental.png";
import Bad from "../assets/Bad.png";
import Meh from "../assets/Meh.png";
import Good from "../assets/happy.png";
import BarChart from "../Components/Bargraph";

function Analytics() {
  return (
    <div className="container-body">
      <TopBar name="Analytics" />
      <div className="pageContainer">
        <h2 className="section-title">
          <span>⛰️</span> Take a look at your progress
        </h2>
        <div className="statCardContainer">
          <AnalyticsStatCard
            image={MentalIcon}
            category={"MENTAL"}
            status={"Not doing Well"}
            emojiStatus={Bad}
            style={{ backgroundColor: "#ffc176" }}
          />
          <AnalyticsStatCard
            image={NutritionIcon}
            category={"NUTRITION"}
            status={"Keep it up!"}
            emojiStatus={Good}
            style={{ backgroundColor: "#9FD99E" }}
          />
          <AnalyticsStatCard
            image={PhysicalIcon}
            category={"PHYSICAL"}
            status={"Try Harder!"}
            emojiStatus={Meh}
            style={{ backgroundColor: "#B3E0EE" }}
          />
          <AnalyticsStatCard
            image={SleepIcon}
            category={"SLEEP"}
            status={"Not doing Well"}
            emojiStatus={Bad}
            style={{ backgroundColor: "#CECDFF" }}
          />
        </div>
      </div>
      <div className="chart-container">
        <p>Activity Overview</p>
        <BarChart />
      </div>
    </div>
  );
}

export default Analytics;

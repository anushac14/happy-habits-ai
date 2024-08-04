import Logo from "../assets/lgo.png";
import AwardLogo from "../assets/Award 2.png";
import SettingsIcon from "../assets/settings solid 1.png";
import DashboardIcon from "../assets/Vector.png";
import LogIcon from "../assets/Icon.png";
import AnalyticsIcon from "../assets/activity.png";
import GoalsIcon from "../assets/Star 1.png";

function SideBar() {
  return (
    <div className="sideBar">
      <div className="logoDiv">
        <img src={Logo} alt="Logo" />
        <h2>HappyHabits AI</h2>
      </div>
      <div className="menuDiv">
        <ul className="menuList grid">
          <li className="listItem">
            <a href="/" className="menuLink flex">
              <img src={DashboardIcon} alt="" />
              <span className="smallText">Dashboard</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/Analytics" className="menuLink flex">
              <img src={AnalyticsIcon} alt="" />
              <span className="smallText">Analytics</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/DailyLog" className="menuLink flex">
              <img src={LogIcon} alt="" />
              <span className="smallText">Daily Log</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/Goals" className="menuLink flex">
              <img src={GoalsIcon} alt="" />
              <span className="smallText">Goals</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/Badges" className="menuLink flex">
              <img src={AwardLogo} alt="" />
              <span className="smallText">Badges</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/Settings" className="menuLink flex">
              <img src={SettingsIcon} alt="" />
              <span className="smallText">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

import settingsIcon from "../assets/settings 1.png";
import notificationIcon from "../assets/002-notification-1.png";
import profileIcon from "../assets/user 3 2.png";

function TopBar(props) {
  return (
    <div className="TopBarDiv">
      <h3>{props.name}</h3>
      <div className="Bar-RightSide">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for something"
            className="search-bar"
          />
        </div>
        <div className="circle">
          <img src={settingsIcon} alt="" />
        </div>
        <div className="circle">
          <img src={notificationIcon} alt="" />
        </div>
        <div className="circle">
          <img src={profileIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;

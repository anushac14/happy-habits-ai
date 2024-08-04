import Sleep from "../assets/sleep.png";

function AnalyticsStatCard(props) {
  return (
    <div className="card" style={props.style}>
      <div className="cardTop">
        <div className="squareIcon">
          <img src={props.image} alt="" />
        </div>
        <h3>{props.category}</h3>
      </div>
      <div className="cardBottom">
        <p>{props.status}</p>
        <img src={props.emojiStatus} alt="" />
      </div>
    </div>
  );
}

export default AnalyticsStatCard;

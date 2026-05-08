import "./Loader.css";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>{text}</p>
    </div>
  );
}

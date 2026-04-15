import "./Loader.scss";

const Loader = ({ fullScreen = true }: { fullScreen?: boolean }) => {
  return (
    <div className={`loader-wrap ${!fullScreen ? "loader-inline" : ""}`}>
      <div className="loader-content">
        <h1>SHOPEASY</h1>
        <div className="dots-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
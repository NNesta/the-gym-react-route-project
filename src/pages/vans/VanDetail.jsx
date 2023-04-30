import { Link, useLocation, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

const loader = ({ params }) => {
  return getVans(params.id);
};

const VanDetail = () => {
  const location = useLocation();
  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  const van = useLoaderData();
  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr;{" "}
        <span>{search ? `Back to ${type} vans` : "Back to all vans"}</span>
      </Link>
      <div className="van-detail">
        <img alt="" src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
};

export { loader };
export default VanDetail;

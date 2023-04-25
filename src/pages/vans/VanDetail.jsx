import { useParams, Link, useLocation } from "react-router-dom";
import useFetchHook from "../../hooks/fetchHook";

const VanDetail = () => {
  const location = useLocation();
  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  const { id } = useParams();
  const { data: van, isLoading } = useFetchHook(`/api/vans/${id}`);
  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr;{" "}
        <span>{search ? `Back to ${type} vans` : "Back to all vans"}</span>
      </Link>
      {!isLoading && van ? (
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
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default VanDetail;

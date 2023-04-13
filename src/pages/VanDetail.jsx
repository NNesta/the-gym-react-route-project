import { useParams } from "react-router-dom";
import useFetchHook from "../hooks/fetchHook";

const VanDetail = () => {
  const { id } = useParams();
  const { data: van, isLoading } = useFetchHook(`/api/vans/${id}`);
  console.log(van, isLoading);
  return (
    <div className="van-detail-container">
      {!isLoading && van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
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

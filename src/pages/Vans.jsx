import useFetchHook from "../hooks/fetchHook";
import { Link } from "react-router-dom";

const Vans = () => {
  const { data, error, isLoading } = useFetchHook("/api/vans");
  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="van-list-container">
          <h1>Explore our vans List options 🚐</h1>
          <ul className="van-list">
            {!isLoading &&
              data?.length &&
              data.map((van) => (
                <li key={van.id}>
                  <Link to={`/vans/${van.id}`} className="van-tile">
                    <img src={van.imageUrl} alt="" />
                    <div className="van-info">
                      <h3>{van.name}</h3>
                      <p>
                        ${van.price}
                        <span>/day</span>
                      </p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>
                      {van.type}
                    </i>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Vans;

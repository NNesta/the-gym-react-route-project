import useFetchHook from "../../hooks/fetchHook";
import { Link, useSearchParams } from "react-router-dom";

const Vans = () => {
  const { data: vans, error, isLoading } = useFetchHook("/api/vans");
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const displayedVans = typeFilter
    ? vans?.filter((van) => van.type.toLowerCase() === typeFilter.toLowerCase())
    : vans;
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="van-list-container">
          <h1>Explore our vans options 🚐</h1>
          <div className="van-list-filter-buttons">
            <button
              onClick={() => setSearchParams({ type: "simple" })}
              className={`van-type simple ${
                typeFilter === "simple" && "selected"
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setSearchParams({ type: "luxury" })}
              className={`van-type luxury ${
                typeFilter === "luxury" && "selected"
              }`}
            >
              Luxury
            </button>
            <button
              onClick={() => setSearchParams({ type: "rugged" })}
              className={`van-type rugged ${
                typeFilter === "rugged" && "selected"
              }`}
            >
              Rugged
            </button>
            {typeFilter && (
              <button
                onClick={() => setSearchParams({})}
                className="van-type clear-filters"
              >
                Clear
              </button>
            )}
          </div>
          <ul className="van-list">
            {!isLoading &&
              displayedVans?.map((van) => (
                <li key={van.id}>
                  <Link
                    to={van.id}
                    state={{
                      search: `?${searchParams.toString()}`,
                      type: typeFilter,
                    }}
                    className="van-tile"
                  >
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

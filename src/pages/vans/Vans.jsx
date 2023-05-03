import { Suspense } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";
const loader = () => {
  return defer({ vans: getVans() });
};

const Vans = () => {
  const loadedData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const renderVansElements = (loadedVans) => {
    console.log({ loadedVans });
    const displayedVans = typeFilter
      ? loadedVans?.filter(
          (van) => van.type.toLowerCase() === typeFilter.toLowerCase()
        )
      : loadedVans;
    return (
      <>
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
          {displayedVans?.map((van) => (
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
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div>
      {false ? (
        <div>{"error"}</div>
      ) : (
        <div className="van-list-container">
          <h1>Explore our vans options 🚐</h1>
          <Suspense fallback={<h2>Loading vans...</h2>}>
            <Await resolve={loadedData.vans}>{renderVansElements}</Await>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Vans;
export { loader };

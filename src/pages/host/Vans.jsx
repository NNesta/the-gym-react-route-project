import { Link } from "react-router-dom";
import useFetchHook from "../../hooks/fetchHook";

export default function HostVans() {
  const { data: vans, isLoading } = useFetchHook("/api/host/vans");
  const hostVansEls = vans?.map((van) => (
    <Link
      to={`/host/vans/${van.id}`}
      key={van.id}
      className="host-van-link-wrapper"
    >
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={van.name} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {!isLoading ? <section>{hostVansEls}</section> : <h2>Loading...</h2>}
      </div>
    </section>
  );
}

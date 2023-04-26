import { Link, useParams, Outlet, NavLink } from "react-router-dom";
import useFetchHook from "../../hooks/fetchHook";

const activeStyles = {
  fontWeight: "bold",
  textDecoration: "underline",
  color: "#161616",
};

const HostVanDetails = () => {
  const { id } = useParams();
  // const obj = useFetchHook(`/api/host/vans/${id}`);
  const { data: currentVan, isLoading } = useFetchHook(`/api/host/vans/${id}`);
  // console.log({ obj });
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan?.imageUrl} alt="" />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan?.type}`}>
              {currentVan?.type}
            </i>
            {/* <h3>{currentVan?.name}</h3> */}
            <h4>${currentVan?.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            end
            to="."
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
};

export default HostVanDetails;

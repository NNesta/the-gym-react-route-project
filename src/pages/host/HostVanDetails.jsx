import { Suspense } from "react";
import {
  Link,
  Outlet,
  NavLink,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";

const activeStyles = {
  "font-weight": "bold",
  textDecoration: "underline",
  color: "#161616",
};
export const loader = async ({ params, request }) => {
  await requireAuth(request);
  return defer({ van: getVan(params.id) });
};

const HostVanDetails = () => {
  const currentVanPromise = useLoaderData();
  return (
    <section>
      <Link to="/host/vans" relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <Suspense fallback={<h2>Current van loading...</h2>}>
          <Await resolve={currentVanPromise.van}>
            {(currentVan) => (
              <>
                <div className="host-van-detail">
                  <img src={currentVan.imageUrl} alt="" />
                  <div className="host-van-detail-info-text">
                    <i className={`van-type van-type-${currentVan.type}`}>
                      {currentVan.type}
                    </i>
                    <h3>{currentVan.name}</h3>
                    <h4>${currentVan.price}/day</h4>
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
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
};

export default HostVanDetails;

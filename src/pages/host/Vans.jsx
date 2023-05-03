import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

const loader = async ({ request }) => {
  await requireAuth(request);
  return defer({ hostVans: getHostVans() });
};

const HostVans = () => {
  const loadedVans = useLoaderData();
  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <Suspense fallback={<h2>Loading hosted vans...</h2>}>
          <Await resolve={loadedVans.hostVans}>
            {(vans) => {
              return vans.length > 0 ? (
                <section>
                  {vans.map((van) => (
                    <Link
                      to={van.id}
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
                  ))}
                </section>
              ) : (
                <h2>Loading...</h2>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
};

export { loader };
export default HostVans;

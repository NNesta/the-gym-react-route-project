import useFetchHook from "../../hooks/fetchHook";
import { Link } from "react-router-dom";

const HostVans = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  const { data: vans } = useFetchHook("/api/host/vans");
  const hostVansEls = vans?.map((van) => (
=======
=======
>>>>>>> 0ea7a31b150f8db1f6be457f6c8a44e18f8856b1
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const hostVansEls = vans.map((van) => (
>>>>>>> e40f82e (feat: changing literal function declation with arrow function)
    <Link to={van.id} key={van.id} className="host-van-link-wrapper">
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
        {vans?.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
};
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> e40f82e (feat: changing literal function declation with arrow function)
=======

>>>>>>> 0ea7a31b150f8db1f6be457f6c8a44e18f8856b1
export default HostVans;

import { useOutletContext } from "react-router-dom";

const HostVanInfo = () => {
  const { currentVan } = useOutletContext();
  return (
    <section className="host-van-detail-info">
      <h4>Name: {currentVan.name}</h4>
      <h4>Category: {currentVan.type}</h4>
      <h4>Description: {currentVan.description}</h4>
      <h4>Visibility: Public</h4>
    </section>
  );
};

export default HostVanInfo;

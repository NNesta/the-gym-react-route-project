import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetail from "./pages/vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans from "./pages/host/Vans";
import HostVanDetails from "./pages/host/HostVanDetails";
import HostVanInfo from "./pages/host/HostVanInfo";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanPricing from "./pages/host/HostVanPricing";
import NotFound from "./pages/404";
import Error from "./components/Error";
import "./server";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="vans" element={<Vans />} loader={vansLoader} />
        <Route path="vans/:id" element={<VanDetail />} />
        <Route path="about" element={<About />} />
        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="vans" element={<HostVans />} />
          <Route path="vans/:id" element={<HostVanDetails />}>
            <Route index element={<HostVanInfo />} />
            <Route path="pricing" element={<HostVanPricing />} />
            <Route path="photos" element={<HostVanPhotos />} />
          </Route>
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;

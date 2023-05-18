import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard, { loader as dashboardLoader } from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/host/vans";
import HostVanDetails, {
  loader as HostVanDetailsLoader,
} from "./pages/host/HostVanDetails";
import HostVanInfo from "./pages/host/HostVanInfo";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanPricing from "./pages/host/HostVanPricing";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import NotFound from "./pages/404";
import Error from "./components/Error";
import "./server";
import { requireAuth } from "./utils";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route
          path="vans"
          element={<Vans />}
          errorElement={<Error />}
          loader={vansLoader}
        />
        <Route
          path="vans/:id"
          element={<VanDetail />}
          errorElement={<Error />}
          loader={vanDetailLoader}
        />
        <Route
          path="/login"
          element={<Login />}
          loader={loginLoader}
          action={loginAction}
        />
        <Route path="about" element={<About />} />
        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} loader={dashboardLoader} />

          <Route
            path="vans"
            element={<HostVans />}
            loader={hostVansLoader}
            errorElement={<Error />}
          />
          <Route
            errorElement={<Error />}
            loader={HostVanDetailsLoader}
            path="vans/:id"
            element={<HostVanDetails />}
          >
            <Route
              index
              element={<HostVanInfo />}
              loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
              path="pricing"
              element={<HostVanPricing />}
              loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
              path="photos"
              element={<HostVanPhotos />}
              loader={async ({ request }) => await requireAuth(request)}
            />
          </Route>
          <Route
            path="income"
            element={<Income />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="reviews"
            element={<Reviews />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;

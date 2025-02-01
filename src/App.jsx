import { useRoutes } from "react-router-dom";
import Home from "./home";
import Pagination from "./25-Projects/1-pagination";
import StarRating from "./25-Projects/2-star-rating";
import Modal from "./25-Projects/3-custom-modal-popup";
import SkeletonLoader from "./25-Projects/4-skeleton-Loader";
import DarkLightTheme from "./25-Projects/5-theme";

function CustomRoutes() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pagination",
      element: <Pagination />,
    },
    {
      path: "/star-rating",
      element: <StarRating />,
    },
    {
      path: "/modal-popup",
      element: <Modal />,
    },
    {
      path: "/skeleton-loading",
      element: <SkeletonLoader />,
    },
    {
      path: "/dark-light-theme",
      element: <DarkLightTheme />,
    },
  ]);

  return elements;
}
function App() {
  return (
    <>
      <CustomRoutes />
    </>
  );
}

export default App;

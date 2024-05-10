import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage/ErrorPage";
import Root from "./root";
import Welcome from "./Welcome/Welcome";
import StaySearch from "./Stay/StaySearch";
import StayMeals from "./Stay/StayMeals";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: 'stay/search',
          element: <StaySearch />
        },
        {
          path: 'stay/meals',
          element: <StayMeals />
        }
      ]
    }
  ]);
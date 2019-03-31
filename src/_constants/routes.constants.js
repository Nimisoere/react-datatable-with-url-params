import ManageCandidates from "../components/Candidates";
import NotFound from "../components/NotFound";

export const routeConstants = {
  HOMEPAGE: {
    key: "candidates",
    title: "Candidates",
    exact: true,
    name: "Candidates",
    path: "/",
    menu: false,
    pageComponent: ManageCandidates,
    enabled: true
  },
  NOTFOUND_ROUTE: {
    key: "pagenotfound",
    name: "PageNotFound",
    path: "*",
    exact: true,
    menu: false,
    pageComponent: NotFound,
    enabled: true
  }
};

export const createRoutes = () => {
  const routes = [];
  for (var route in routeConstants) {
    routeConstants[route].enabled && routes.push(routeConstants[route]);
  }
  return routes;
};

export const routes = createRoutes();

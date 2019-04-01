import ManageApplications from "../components/Applications";
import NotFound from "../components/NotFound";

export const routeConstants = {
  APPLICATIONS: {
    key: "applications",
    title: "Applications",
    exact: true,
    name: "Applications",
    path: "/",
    menu: false,
    pageComponent: ManageApplications,
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

export const routeConstants = {
  HOMEPAGE: {
    key: "home",
    title: "Home",
    exact: true,
    name: "Home",
    path: "/",
    menu: false,
    pageComponent: ()=> null,
    enabled: true
  },
};

export const createRoutes = () => {
  const routes = [];
  for (var route in routeConstants) {
    routeConstants[route].enabled && routes.push(routeConstants[route]);
  }
  return routes;
};

export const routes = createRoutes();

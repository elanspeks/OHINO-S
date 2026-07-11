type RouteEntry = {
  path: string;
  // React component type (functional or class)
  component: any;
};

const routes: RouteEntry[] = [];

export function registerRoute(path: string, component: any) {
  if (!path) throw new Error('Route path required');
  if (!component) throw new Error('Route component required');
  // Prevent duplicate paths
  if (routes.some(r => r.path === path)) return;
  routes.push({ path, component });
}

export function getRoutes() {
  return routes.slice();
}

export function clearRoutes() {
  routes.length = 0;
}

export default { registerRoute, getRoutes, clearRoutes };

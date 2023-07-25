const mapping: Record<string, string> = {
  'fused-images': 'fused_image',
  'kamen-rider-images': 'kamen_rider_image',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

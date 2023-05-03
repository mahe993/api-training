export const MAPBOX_API_BASE_URL = "https://api.mapbox.com";

export enum MapBoxServices {
  directions = "directions",
  matrix = "matrix",
  geocoding = "geocoding",
  isochrone = "isochrone",
  optimization = "optimization",
  // ...
}

export enum MapBoxServiceProfiles {
  traffic = "driving-traffic",
  driving = "driving",
  cycling = "cycling",
  walking = "walking",
}

export interface MapBoxDirectionsOptions {
  profile: string;
  coordinates: string;
  alternatives?: boolean;
  annotations?: "distance" | "duration" | "speed"; //....
  avoid_maneuver_radius?: number;
  //....
}

export enum MapBoxDirectionsError {}

import { GoogleMapsService } from "./googleMaps/googleMapsService";
import { MapBoxService } from "./mapBox/mapBoxService";

export const CURRENT_MAP_VENDOR = "mapBox";

export enum MapVendors {
  mapBox = "mapBox",
  googleMaps = "googleMaps",
}

export const mapVendors = {
  mapBox: MapBoxService,
  googleMaps: GoogleMapsService,
};

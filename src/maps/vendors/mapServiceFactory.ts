import { MapsServices } from "../maps";
import { GoogleMapsService } from "./googleMaps/googleMapsService";
import { MapBoxService } from "./mapBox/mapBoxService";

export class MapsServiceFactory {
  public getVendor(vendorName: string): MapsServices {
    switch (vendorName) {
      case "mapBox": {
        return new MapBoxService();
      }
      case "googleMaps": {
        return new GoogleMapsService();
      }
      default: {
        return new MapBoxService();
      }
    }
  }
}

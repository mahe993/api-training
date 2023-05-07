import { MapsServices } from "./maps";
import { MapsServiceFactory } from "./vendors/mapServiceFactory";
import { MapVendors } from "./vendors/vendors";

export class MapsService {
  vendor: MapsServices;
  constructor(config: MapVendors) {
    // this method is hackish and only available to javascript
    // this.vendor = new mapVendors["config"]();
    const mapsFactory = new MapsServiceFactory();
    this.vendor = mapsFactory.getVendor(config);
  }

  public async getEtaInSeconds(
    currentLocation: string,
    destination: string
  ): Promise<number> {
    return this.vendor.getEtaInSeconds(currentLocation, destination);
  }
}

// go with SDK instead of API
//   public async getEtaInSecondsApi(
//     currentLocation: string,
//     destination: string
//   ): Promise<number> {
//     return this.vendor.getEtaInSecondsApi(currentLocation, destination);
//   }
// }

import { Controller, Get, Path, Route } from "tsoa";
import { MapsService } from "./mapsService";
import { MapVendors } from "./vendors/vendors";

@Route("maps")
export class MapsController extends Controller {
  mapsService: MapsService;
  constructor() {
    super();
    this.mapsService = new MapsService(MapVendors.mapBox);
  }

  @Get("eta/:currentLocation;:destination")
  public async getEta(
    @Path() currentLocation: string,
    @Path() destination: string
  ): Promise<number> {
    return this.mapsService.getEtaInSeconds(currentLocation, destination);
  }
}

// // USE SDK
// @Get("eta/api/:currentLocation;:destination")
// public async getEtaApi(
//   @Path() currentLocation: string,
//   @Path() destination: string
// ): Promise<number> {
//   return this.mapsService.getEtaInSecondsApi(currentLocation, destination);
// }

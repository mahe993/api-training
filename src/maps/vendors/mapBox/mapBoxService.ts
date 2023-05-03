import mbxDirections, {
  DirectionsService,
} from "@mapbox/mapbox-sdk/services/directions";
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import { MapBoxServiceProfiles } from "./mapBox";
import { MapsServices } from "src/maps/maps";

export class MapBoxService implements MapsServices {
  directionsClient: DirectionsService;
  constructor() {
    // init service clients: https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#getdirections
    this.directionsClient = mbxDirections({
      accessToken: process.env.MAPBOX_ACCESS_TOKEN!,
    });
  }

  public async getEtaInSeconds(
    currentLocation: string,
    destination: string
  ): Promise<number | never> {
    try {
      const curr = currentLocation.split(",");
      const dest = destination.split(",");

      const currentCoordinates: Coordinates = [
        Number(curr[0]),
        Number(curr[1]),
      ];

      const destinationCoordinates: Coordinates = [
        Number(dest[0]),
        Number(dest[1]),
      ];

      const directionsReq = await this.directionsClient
        .getDirections({
          profile: MapBoxServiceProfiles.traffic,
          waypoints: [
            { coordinates: currentCoordinates },
            { coordinates: destinationCoordinates },
          ],
        })
        .send();

      const res = directionsReq.body;
      console.log(res);

      if (res.code === "Ok") {
        return res.routes[0].duration;
      }
      return -1; // error handling here: https://docs.mapbox.com/api/navigation/directions/#directions-api-errors
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }
}

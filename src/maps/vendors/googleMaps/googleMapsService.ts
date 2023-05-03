import { MapsServices } from "src/maps/maps";

export class GoogleMapsService implements MapsServices {
  public async getEtaInSeconds(
    currentLocation: string,
    destination: string
  ): Promise<number> | never {
    try {
      // get eta in seconds using google maps sdk
      console.log(currentLocation, destination);
      return 1;
    } catch (err) {
      throw new Error();
    }
  }
}

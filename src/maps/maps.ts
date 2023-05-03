export interface MapsServices {
  getEtaInSeconds(
    currentLocation: string,
    destination: string
  ): Promise<number | never>;
  // ...
}

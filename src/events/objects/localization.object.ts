export class LocalizationObject {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };

  constructor(name: string, latitude: number, longitude: number) {
    this.name = name;
    this.coordinates = {
      latitude,
      longitude,
    };
  }
}
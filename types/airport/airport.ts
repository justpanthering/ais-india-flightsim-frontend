export interface Airport {
  icao: string;
  localeName: string;
  aerodomeName: string;
  coordinates: {
    latitude: {
      measurement: number;
      hemisphere: "N" | "S";
    };
    longitude: {
      measurement: number;
      hemisphere: "E" | "W";
    };
  };
  elevation: number;
  address: string;
  runways: {
    name: string;
    dimension: number;
    surface: string;
    coordinates: {
      latitude: {
        measurement: number;
        hemisphere: "N" | "S";
      };
      longitude: {
        measurement: number;
        hemisphere: "E" | "W";
      };
    };
    elevation: number;
    visualSlopeIndicationSystem: string;
  }[];
  charts: {
    name: string;
    url: string;
  }[];
  radarTrafficCommunicationFrequency: number[];
  towerTrafficCommunicationFrequency: number[];
  controlTrafficCommunicationFrequency: number[];
  approachTrafficCommunicationFrequency: number[];
  groundTrafficCommunicationFrequency: number[];
  informationTrafficCommunicationFrequency: number[];
}

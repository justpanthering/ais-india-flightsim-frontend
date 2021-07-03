export interface Runway {
  id?: number;
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
}

export interface Airport {
  id: number;
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
  runways: Runway[];
  charts: {
    id?: number;
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

export type AirportListItem = Pick<Airport, "id" | "localeName" | "icao">;

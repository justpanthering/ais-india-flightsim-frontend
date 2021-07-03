import { AxiosResponse } from "axios";
import { Airport, AirportListItem } from "../types";
import { apiRouteInstance } from "./client";
import {
  apiAirportDetailPath,
  apiAirportsCreatePath,
  apiAirportsPath,
} from "./constants";
import { createPath } from "./utils";

export function createAirport(
  airport: Omit<Airport, "id">
): Promise<AxiosResponse<Airport>> {
  const res = apiRouteInstance.client.post<Airport>(
    createPath(apiAirportsCreatePath),
    airport
  );
  return res;
}

export async function getAirportList(
  query?: string
): Promise<AirportListItem[]> {
  const res = await apiRouteInstance.client.get<{
    airports: AirportListItem[];
  }>(createPath(apiAirportsPath), {
    params: { filter: query },
  });
  return res.data.airports;
}

export async function getAirportDetail(airportId: number): Promise<Airport> {
  const res = await apiRouteInstance.client.get<{ airport: Airport }>(
    createPath(apiAirportDetailPath, { airportId })
  );
  return res.data.airport;
}

export async function updateAirportDetail(
  airportId: number,
  airport: Omit<Airport, "id">
): Promise<Airport> {
  const res = await apiRouteInstance.client.put<{ airport: Airport }>(
    createPath(apiAirportDetailPath, { airportId }),
    airport
  );
  return res.data.airport;
}

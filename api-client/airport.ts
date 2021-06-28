import { AxiosResponse } from "axios";
import { Airport } from "../types";
import { apiRouteInstance } from "./client";
import {
  apiAirportDetailPath,
  apiAirportsCreatePath,
  apiAirportsPath,
} from "./constants";
import { createPath } from "./utils";

export function createAirport(
  airport: Airport
): Promise<AxiosResponse<Airport>> {
  console.log("sending request: ", createPath(apiAirportsCreatePath));
  console.log("api base url: ", process.env.API_BASE_URL);
  const res = apiRouteInstance.client.post<Airport>(
    createPath(apiAirportsCreatePath),
    airport
  );
  return res;
}

export function getAirportList(
  query: string
): Promise<AxiosResponse<Airport[]>> {
  return apiRouteInstance.client.get<Airport[]>(createPath(apiAirportsPath), {
    params: { filter: query },
  });
}

export async function getAirportDetail(airportId: number): Promise<Airport> {
  const res = await apiRouteInstance.client.get<{ airport: Airport }>(
    createPath(apiAirportDetailPath, { airportId })
  );
  return res.data.airport;
}

export async function updateAirportDetail(
  airportId: number,
  airport: Airport
): Promise<Airport> {
  const res = await apiRouteInstance.client.put<{ airport: Airport }>(
    createPath(apiAirportDetailPath, { airportId }),
    airport
  );
  return res.data.airport;
}

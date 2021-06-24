export const API_BASE_URL = process.env.API_BASE_URL || "";

//  Main
export const apiLoginPath = ["login"] as const;

// Airports
export const apiAirportsPath = ["airports"] as const;
export const apiAirportDetailPath = [apiAirportsPath, "{{airportId}}"] as const;
export const apiAirportsCreatePath = [apiAirportsPath, "create"] as const;

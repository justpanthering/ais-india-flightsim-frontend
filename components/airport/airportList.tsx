import { SimpleGrid } from "@chakra-ui/layout";
import Link from "next/link";
import React from "react";
import { AirportListItem } from "../../types";
import { pathAirportDetails } from "../../utils/routes";

interface Props {
  airports: AirportListItem[];
}

export default function AirportList({ airports }: Props): JSX.Element {
  return (
    <SimpleGrid columns={3} columnGap={10} margin="1rem 3rem">
      {airports &&
        airports.map((airport) => (
          <div key={`airport_${airport.icao}`}>
            <Link
              href={pathAirportDetails.replace(":id", airport.id.toString())}
            >
              <a>
                {airport.localeName}/{airport.icao}
              </a>
            </Link>
          </div>
        ))}
    </SimpleGrid>
  );
}

import React, { useEffect, useState } from "react";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { getAirportDetail, getAirportList } from "../../api-client/airport";
import { Airport, AirportListItem } from "../../types";
import { VStack, Box, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import Description from "../../components/Description";
import GroupWithHeader from "../../components/GroupWithHeader";

interface Props {
  airportFromServerProps: Airport | null;
}

export default function AirportDetail({
  airportFromServerProps,
}: Props): JSX.Element {
  const [airport, setAirport] = useState<Airport>();
  useEffect(() => {
    if (airportFromServerProps && !airport) {
      setAirport(airportFromServerProps);
    }
  }, []);
  if (!airport) {
    return <>Airport not found</>;
  }
  return (
    <Box p="1rem 2rem" maxW="1080px">
      <GroupWithHeader title="General Information">
        <VStack>
          <Description
            title="ICAO"
            description={airport.icao}
            verify={!!airport.icao}
          />
          <Description
            title="Name"
            description={`${airport.aerodomeName}, ${airport.localeName}`}
            verify={!!airport.aerodomeName && !!airport.localeName}
          />
          <Description title="Elevation" description={`${airport.elevation}`} />
          <Description
            title="Coordinates"
            description={
              <VStack>
                <Description
                  title="Latitude"
                  description={`${airport.coordinates.latitude.measurement} ${airport.coordinates.latitude.hemisphere}`}
                  verify={
                    !!airport.coordinates.latitude.measurement &&
                    !!airport.coordinates.latitude.hemisphere
                  }
                />
                <Description
                  title="Longitude"
                  description={`${airport.coordinates.longitude.measurement} ${airport.coordinates.longitude.hemisphere}`}
                  verify={
                    !!airport.coordinates.longitude.measurement &&
                    !!airport.coordinates.longitude.hemisphere
                  }
                />
              </VStack>
            }
          />
          <Description
            title="Address"
            description={<p style={{ whiteSpace: "pre" }}>{airport.address}</p>}
            verify={!!airport.address}
          />
        </VStack>
      </GroupWithHeader>
      <GroupWithHeader title="Runways">
        <Table>
          <Thead>
            <Tr>
              <Th>Runway</Th>
              <Th>Dimension</Th>
              <Th>Surface</Th>
              <Th>Coordinates</Th>
              <Th>Elevation</Th>
              <Th>Visual Slope Indication System</Th>
            </Tr>
          </Thead>
          <Tbody>
            {airport.runways.map((runway) => (
              <Tr key={`runway_${runway.name}`}>
                <Td>{runway.name}</Td>
                <Td>{runway.dimension || "--"}</Td>
                <Td>{runway.surface || "--"}</Td>
                <Td>
                  {runway.coordinates.latitude.measurement &&
                  runway.coordinates.latitude.hemisphere &&
                  runway.coordinates.longitude.measurement &&
                  runway.coordinates.longitude.hemisphere ? (
                    <VStack>
                      <span>
                        {runway.coordinates.latitude.measurement}{" "}
                        {runway.coordinates.latitude.hemisphere}
                      </span>
                      <span>
                        {runway.coordinates.longitude.measurement}{" "}
                        {runway.coordinates.longitude.hemisphere}
                      </span>
                    </VStack>
                  ) : (
                    "--"
                  )}
                </Td>
                <Td>{runway.elevation || "--"}</Td>
                <Td>
                  <p style={{ whiteSpace: "pre" }}>
                    {runway.visualSlopeIndicationSystem || "--"}
                  </p>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </GroupWithHeader>
      <GroupWithHeader title="Communication">
        <Description
          title="Information"
          description={
            <VStack>
              {airport.informationTrafficCommunicationFrequency.map((freq) => (
                <span key={`information_freq_${freq}`}>{freq}</span>
              ))}
            </VStack>
          }
          verify={airport.informationTrafficCommunicationFrequency.length > 0}
        />
        <Description
          title="Tower"
          description={
            <VStack>
              {airport.towerTrafficCommunicationFrequency.map((freq) => (
                <span key={`tower_freq_${freq}`}>{freq}</span>
              ))}
            </VStack>
          }
          verify={airport.towerTrafficCommunicationFrequency.length > 0}
        />
        <Description
          title="Radar"
          description={
            <VStack>
              {airport.radarTrafficCommunicationFrequency.map((freq) => (
                <span key={`radar_freq_${freq}`}>{freq}</span>
              ))}
            </VStack>
          }
          verify={airport.radarTrafficCommunicationFrequency.length > 0}
        />
        <Description
          title="Control"
          description={
            <VStack>
              {airport.controlTrafficCommunicationFrequency.map((freq) => (
                <span key={`control_freq_${freq}`}>{freq}</span>
              ))}
            </VStack>
          }
          verify={airport.controlTrafficCommunicationFrequency.length > 0}
        />
        <Description
          title="Approach"
          description={
            <VStack>
              {airport.approachTrafficCommunicationFrequency.map((freq) => (
                <span key={`approach_freq_${freq}`}>{freq}</span>
              ))}
            </VStack>
          }
          verify={airport.approachTrafficCommunicationFrequency.length > 0}
        />
        <Description
          title="Ground"
          description={
            <VStack>
              {airport.groundTrafficCommunicationFrequency.map((freq) => (
                <span key={`ground_freq_${freq}`}>{freq}</span>
              ))}
            </VStack>
          }
          verify={airport.groundTrafficCommunicationFrequency.length > 0}
        />
      </GroupWithHeader>
      {!!airport.charts.length && (
        <GroupWithHeader title="Charts">
          {airport.charts.map((chart) => (
            <Description
              key={`chart_${chart.url}`}
              title={chart.name}
              description={<a href={chart.url}>chart.url</a>}
            />
          ))}
        </GroupWithHeader>
      )}
    </Box>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  let res: AirportListItem[] = [];
  try {
    res = await getAirportList();
  } catch (e) {
    console.error(e);
  }

  return {
    paths: res.map((airport) => ({ params: { id: airport.id.toString() } })),
    fallback: true,
  };
}

export async function getStaticProps(context: {
  params: { id: string };
}): Promise<GetStaticPropsResult<Props>> {
  const { id } = context.params;
  let res: Airport | null = null;
  try {
    res = await getAirportDetail(Number(id));
  } catch (e) {
    console.error(e);
  }
  return {
    props: { airportFromServerProps: res || null },
  };
}

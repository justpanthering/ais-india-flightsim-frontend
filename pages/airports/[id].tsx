import React, { useEffect, useState } from "react";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { getAirportDetail, getAirportList } from "../../api-client/airport";
import { Airport, AirportListItem } from "../../types";
import {
  VStack,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Tag,
  HStack,
} from "@chakra-ui/react";
import Description from "../../components/Description";
import GroupWithHeader from "../../components/GroupWithHeader";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { pathAdminAirportDetails } from "../../utils/routes";

interface Props {
  airportFromServerProps: Airport | null;
}

export default function AirportDetail({
  airportFromServerProps,
}: Props): JSX.Element {
  const [airport, setAirport] = useState<Airport>();
  const [session, isLoading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (airportFromServerProps && !airport) {
      setAirport(airportFromServerProps);
    }
  }, []);
  if (isLoading) {
    return <>Loading...</>;
  }
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
                <span>
                  {airport.coordinates.latitude.measurement}{" "}
                  {airport.coordinates.latitude.hemisphere}
                </span>
                <span>
                  {airport.coordinates.longitude.measurement}{" "}
                  {airport.coordinates.longitude.hemisphere}
                </span>
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
        <VStack>
          <Description
            title="Information"
            description={
              <VStack>
                {airport.informationTrafficCommunicationFrequency.map(
                  (freq) => (
                    <Tag key={`information_freq_${freq}`}>{freq}</Tag>
                  )
                )}
              </VStack>
            }
            verify={airport.informationTrafficCommunicationFrequency.length > 0}
          />
          <Description
            title="Tower"
            description={
              <HStack>
                {airport.towerTrafficCommunicationFrequency.map((freq) => (
                  <Tag key={`tower_freq_${freq}`}>{freq}</Tag>
                ))}
              </HStack>
            }
            verify={airport.towerTrafficCommunicationFrequency.length > 0}
          />
          <Description
            title="Radar"
            description={
              <VStack>
                {airport.radarTrafficCommunicationFrequency.map((freq) => (
                  <Tag key={`radar_freq_${freq}`}>{freq}</Tag>
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
                  <Tag key={`control_freq_${freq}`}>{freq}</Tag>
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
                  <Tag key={`approach_freq_${freq}`}>{freq}</Tag>
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
                  <Tag key={`ground_freq_${freq}`}>{freq}</Tag>
                ))}
              </VStack>
            }
            verify={airport.groundTrafficCommunicationFrequency.length > 0}
          />
        </VStack>
      </GroupWithHeader>
      {!!airport.charts.length && (
        <GroupWithHeader title="Charts">
          {airport.charts.map((chart) => (
            <Description
              key={`chart_${chart.url}`}
              title={chart.name}
              description={
                <a target="_blank" rel="noreferrer" href={chart.url}>
                  {chart.url}
                </a>
              }
            />
          ))}
        </GroupWithHeader>
      )}
      {session && (
        <Button
          onClick={() =>
            router.push(
              pathAdminAirportDetails.replace(":id", airport.id.toString())
            )
          }
        >
          Edit
        </Button>
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

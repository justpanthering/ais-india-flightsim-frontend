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
  useMediaQuery,
  Divider,
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
  const [isScreenWidthGreater820px] = useMediaQuery("(min-width: 820px)");
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
          <Description
            title="Elevation"
            description={`${airport.elevation} feet`}
          />
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
            isDividerRequired={false}
            title="Address"
            description={<p>{airport.address}</p>}
            verify={!!airport.address}
          />
        </VStack>
      </GroupWithHeader>
      <GroupWithHeader title="Runways">
        {isScreenWidthGreater820px ? (
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Runway</Th>
                <Th>Dimension (meters)</Th>
                <Th>True Bearing (DEG)</Th>
                <Th>Surface</Th>
                <Th>Coordinates</Th>
                <Th>Elevation (feet)</Th>
                <Th>Visual Slope Indication System</Th>
              </Tr>
            </Thead>
            <Tbody>
              {airport.runways.map((runway) => (
                <Tr key={`runway_${runway.name}`}>
                  <Td>{runway.name}</Td>
                  <Td>{runway.dimension || "--"}</Td>
                  <Td>{runway.trueBearing || "--"}</Td>
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
        ) : (
          airport.runways.map((runway) => (
            <GroupWithHeader title={runway.name} key={`ruwnay_${runway.name}`}>
              <VStack>
                <Description title="Designation" description={runway.name} />
                <Description
                  title="Dimension"
                  description={`${runway.dimension} meters`}
                  verify={!!runway.dimension}
                />
                <Description
                  title="True Bearing"
                  description={`${runway.trueBearing} DEG`}
                  verify={!!runway.trueBearing}
                />
                <Description
                  title="Surface"
                  description={runway.surface}
                  verify={!!runway.surface}
                />
                <Description
                  title="Coordinates"
                  verify={
                    !!runway.coordinates.latitude.measurement &&
                    !!runway.coordinates.latitude.hemisphere &&
                    !!runway.coordinates.longitude.measurement &&
                    !!runway.coordinates.longitude.hemisphere
                  }
                  description={
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
                  }
                />
                <Description
                  title="Elevation"
                  description={runway.elevation}
                  verify={!!runway.elevation}
                />
                <Description
                  title="Surface"
                  description={runway.surface}
                  verify={!!runway.surface}
                />
                <Description
                  isDividerRequired={false}
                  title="Visual Slope Indication System"
                  description={
                    <p style={{ whiteSpace: "pre" }}>
                      {runway.visualSlopeIndicationSystem}
                    </p>
                  }
                  verify={!!runway.visualSlopeIndicationSystem}
                />
              </VStack>
            </GroupWithHeader>
          ))
        )}
      </GroupWithHeader>
      <GroupWithHeader title="Communication">
        <VStack>
          <Description
            title="Information"
            description={
              <HStack>
                {airport.informationTrafficCommunicationFrequency.map(
                  (freq) => (
                    <Tag key={`information_freq_${freq}`}>{freq}</Tag>
                  )
                )}
              </HStack>
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
              <HStack>
                {airport.radarTrafficCommunicationFrequency.map((freq) => (
                  <Tag key={`radar_freq_${freq}`}>{freq}</Tag>
                ))}
              </HStack>
            }
            verify={airport.radarTrafficCommunicationFrequency.length > 0}
          />
          <Description
            title="Control"
            description={
              <HStack>
                {airport.controlTrafficCommunicationFrequency.map((freq) => (
                  <Tag key={`control_freq_${freq}`}>{freq}</Tag>
                ))}
              </HStack>
            }
            verify={airport.controlTrafficCommunicationFrequency.length > 0}
          />
          <Description
            title="Approach"
            description={
              <HStack>
                {airport.approachTrafficCommunicationFrequency.map((freq) => (
                  <Tag key={`approach_freq_${freq}`}>{freq}</Tag>
                ))}
              </HStack>
            }
            verify={airport.approachTrafficCommunicationFrequency.length > 0}
          />
          <Description
            title="Ground"
            description={
              <HStack>
                {airport.groundTrafficCommunicationFrequency.map((freq) => (
                  <Tag key={`ground_freq_${freq}`}>{freq}</Tag>
                ))}
              </HStack>
            }
            isDividerRequired={false}
            verify={airport.groundTrafficCommunicationFrequency.length > 0}
          />
        </VStack>
      </GroupWithHeader>
      {!!airport.charts.length && (
        <GroupWithHeader title="Charts">
          {airport.charts.map((chart, i) => (
            <>
              <Description
                key={`chart_${chart.url}`}
                title={chart.name}
                description={
                  <a target="_blank" rel="noreferrer" href={chart.url}>
                    {chart.url}
                  </a>
                }
                isDividerRequired={i < airport.charts.length - 1}
              />
            </>
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
    revalidate: 10,
  };
}

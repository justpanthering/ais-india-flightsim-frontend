import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getAirportList } from "../api-client/airport";
import AirportList from "../components/airport/airportList";
import useAirports from "../hooks/useAirports";
import styles from "../styles/Home.module.scss";
import { AirportListItem } from "../types";

export default function Home({
  airports,
}: {
  airports: AirportListItem[];
}): JSX.Element {
  const { filteredAirports, searchQuery, handleChangeQuery, isFetching } =
    useAirports();
  return (
    <div className={styles.Container}>
      <Head>
        <title>AIS - India</title>
        <meta
          name="description"
          content="The Aeronautical Information Service for India provides the necessary information for various filght simulation in Indian Airspace. Disclaimer: This resource is only meant to be used for flight simulation (Microsoft Flight Simulator 2020, XPlane, etc) and not for actual aviation. THe website does not ensure the authenticity as well as the validity of the information provided with respect to the real counterparts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box
          p="0 2rem"
          w="100%"
          minH="calc(100vh - 3rem)"
          backgroundImage="url(../assets/images/background.jpg)"
        >
          <Box paddingTop="6rem">
            <InputGroup>
              <InputRightElement pointerEvents="none">
                {isFetching ? (
                  <Spinner />
                ) : (
                  <SearchIcon fontSize="lg" color="gray.300" />
                )}
              </InputRightElement>
              <Input
                placeholder="Enter Airport Name/ICAO Code"
                onChange={handleChangeQuery}
              />
            </InputGroup>
            <HStack justifyContent="center" w="100%" marginTop="1rem">
              {isFetching && <Spinner />}
            </HStack>
            <AirportList airports={searchQuery ? filteredAirports : airports} />
          </Box>
        </Box>
      </main>

      <footer>
        <VStack bg="primary" opacity="0.7" p="1rem 2rem" height="3rem">
          <span>
            <Link href="https://justpanthering.github.io/portfolio/">
              <a>Developed By: Ankit Lakra</a>
            </Link>
          </span>
        </VStack>
      </footer>
    </div>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ airports: AirportListItem[] }>
> {
  let airports: AirportListItem[] = [];
  try {
    airports = await getAirportList();
  } catch (e) {
    console.error(e);
  }
  return {
    props: { airports },
    revalidate: 10,
  };
}

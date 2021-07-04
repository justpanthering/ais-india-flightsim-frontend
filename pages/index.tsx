import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { getAirportList } from "../api-client/airport";
import AirportList from "../components/airport/airportList";
import useAirports from "../hooks/useAirports";
import styles from "../styles/Home.module.css";
import { AirportListItem } from "../types";

export default function Home({
  airports,
}: {
  airports: AirportListItem[];
}): JSX.Element {
  const { filteredAirports, searchQuery, handleChangeQuery, isFetching } =
    useAirports();
  return (
    <div className={styles.container}>
      <Head>
        <title>AIS - India</title>
        <meta
          name="description"
          content="The Aeronautical Information Service for India provides the necessary information for various filght simulation in Indian Airspace. Disclaimer: This resource is only meant to be used for flight simulation (Microsoft Flight Simulator 2020, XPlane, etc) and not for actual aviation. THe website does not ensure the authenticity as well as the validity of the information provided with respect to the real counterparts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box p="1rem 2rem" w="100%">
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
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
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
    revalidate: 24 * 60 * 60,
  };
}

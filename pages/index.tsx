import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getAirportList } from "../api-client/airport";
import useAirports from "../hooks/useAirports";
import styles from "../styles/Home.module.css";
import { AirportListItem } from "../types";
import { pathAirportDetails } from "../utils/routes";

export default function Home({
  airports,
}: {
  airports: AirportListItem[];
}): JSX.Element {
  const { handleChangeQuery } = useAirports();
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
        <Box p="1rem 2rem" maxH="100vh">
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <SearchIcon fontSize="lg" color="gray.300" />
            </InputRightElement>
            <Input
              placeholder="Enter Airport Name/ICAO Code"
              onChange={handleChangeQuery}
            />
          </InputGroup>
          <SimpleGrid columns={3} columnGap={10} margin="1rem 3rem">
            {airports &&
              airports.map((airport) => (
                <div key={`airport_${airport.icao}`}>
                  <Link
                    href={pathAirportDetails.replace(
                      ":id",
                      airport.id.toString()
                    )}
                  >
                    <a>
                      {airport.localeName}/{airport.icao}
                    </a>
                  </Link>
                </div>
              ))}
          </SimpleGrid>
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

export async function getStaticProps(): Promise<{
  props: {
    airports: AirportListItem[];
  };
}> {
  let airports: AirportListItem[] = [];
  try {
    airports = await getAirportList();
  } catch (e) {
    console.error(e);
  }
  return {
    props: { airports },
  };
}

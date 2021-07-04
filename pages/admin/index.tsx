import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { GetServerSidePropsResult } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import router from "next/router";
import React from "react";
import { getAirportList } from "../../api-client/airport";
import AirportList from "../../components/airport/airportList";
import useAirports from "../../hooks/useAirports";
import { AirportListItem } from "../../types";
import { pathAdminAirportCreate } from "../../utils/routes";

interface Props {
  airports: AirportListItem[];
}

export default function Admin({ airports }: Props): JSX.Element | null {
  const [session, loading] = useSession();
  const { filteredAirports, searchQuery, handleChangeQuery, isFetching } =
    useAirports();

  if (loading) {
    return null;
  }
  if (!loading && !session) {
    router.push("/");
  }

  function handleCreateClick() {
    router.push(pathAdminAirportCreate);
  }

  return (
    <>
      <Head>
        <title>Dashboard | AIS - India</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box p="0 2rem" w="100%">
          <VStack alignItems="start">
            <Button
              marginLeft="auto"
              leftIcon={<AddIcon />}
              onClick={handleCreateClick}
            >
              Add
            </Button>
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
            <Box>
              <AirportList
                airports={searchQuery ? filteredAirports : airports}
              />
            </Box>
          </VStack>
        </Box>
      </main>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  let res: AirportListItem[] = [];
  try {
    res = await getAirportList();
  } catch (e) {
    console.error(e);
  }
  return {
    props: { airports: res || [] },
  };
}

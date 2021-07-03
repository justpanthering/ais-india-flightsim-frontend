import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { GetStaticPropsResult } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { getAirportList } from "../../api-client/airport";
import AirportList from "../../components/airport/airportList";
import useAirports from "../../hooks/useAirports";
import { AirportListItem } from "../../types";
import { pathAdminAirportCreate } from "../../utils/routes";

interface Props {
  airportsFromServer: AirportListItem[] | null;
}

export default function Admin({
  airportsFromServer,
}: Props): JSX.Element | null {
  const [airports, setAirports] = useState<AirportListItem[]>();
  const [session, loading] = useSession();
  const toast = useToast();

  async function fetchAirportList() {
    try {
      const res = await getAirportList();
      setAirports(res);
    } catch (e) {
      console.error(e);
      toast({
        title: "Unable to get airport list",
        description: e.message,
        status: "error",
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (airportsFromServer && !airports) {
      setAirports(airportsFromServer);
    } else {
      fetchAirportList();
    }
  }, []);

  const { handleChangeQuery } = useAirports();

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
      <Box p="1rem 2rem" maxH="100vh">
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
              <SearchIcon fontSize="lg" color="gray.300" />
            </InputRightElement>
            <Input
              placeholder="Enter Airport Name/ICAO Code"
              onChange={handleChangeQuery}
            />
          </InputGroup>
          <AirportList airports={airports || []} />
        </VStack>
      </Box>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetStaticPropsResult<Props>
> {
  let res: AirportListItem[] | null = null;
  try {
    res = await getAirportList();
  } catch (e) {
    console.error(e);
  }
  return {
    props: { airportsFromServer: res || null },
    revalidate: 24 * 60 * 60,
  };
}

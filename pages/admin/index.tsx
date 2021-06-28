import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import Head from "next/head";
import router from "next/router";
import React from "react";
import useAirports from "../../hooks/useAirports";
import { pathAdminAirportCreate } from "../../utils/routes";

export default function Admin(): JSX.Element | null {
  const [session, loading] = useSession();

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
        </VStack>
      </Box>
    </>
  );
}

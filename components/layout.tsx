import React from "react";
import Link from "next/link";
import { Box, Button, Flex, Spacer, HStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";

const routes = {
  home: "/",
  login: "/login",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <>
      <Box bg="tomato" p="1rem 2rem" color="white" w="100%" position="fixed">
        <Flex alignItems="center">
          Aeronautical Information System - India
          <HStack marginLeft="2rem">
            <Link href={routes.home}>
              <a>Home</a>
            </Link>
          </HStack>
          <Spacer />
          <Link href={routes.login}>
            <a>Login</a>
          </Link>
        </Flex>
      </Box>
      {children}
    </>
  );
}

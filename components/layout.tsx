import React from "react";
import Link from "next/link";
import { Box, Button, Flex, Spacer, HStack } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

const routes = {
  home: "/",
  login: "/login",
  admin: {
    dashboard: "/admin",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [session, loading] = useSession();
  const router = useRouter();
  return (
    <>
      <Box
        bg="tomato"
        p="1rem 2rem"
        color="white"
        w="100%"
        position="fixed"
        height="4rem"
      >
        <Flex alignItems="center">
          Aeronautical Information System - India
          <HStack marginLeft="2rem">
            {router.pathname !== routes.home && (
              <Link href={routes.home}>
                <a>Home</a>
              </Link>
            )}
          </HStack>
          <Spacer />
          {(loading || !session) && router.pathname !== routes.login && (
            <Button onClick={() => signIn()}>Login</Button>
          )}
          {session && (
            <HStack>
              {router.pathname !== routes.admin.dashboard && (
                <Link href={routes.admin.dashboard}>Dashboard</Link>
              )}
              <Button onClick={() => signOut()}>Logout</Button>
            </HStack>
          )}
        </Flex>
      </Box>
      <div style={{ paddingTop: "4rem" }}>{children}</div>
    </>
  );
}

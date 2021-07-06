import React from "react";
import Link from "next/link";
import { Box, Button, Spacer, HStack } from "@chakra-ui/react";
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
    <Box minW="420px">
      <HStack
        bg="primary"
        p="1rem 2rem"
        color="white"
        w="100%"
        position="fixed"
        min-height="4rem"
        zIndex={10}
        minW="420px"
      >
        <Box>
          <Link href={routes.home}>
            <a>Aeronautical Information System - India</a>
          </Link>
        </Box>
        <Spacer />
        {(loading || !session) && router.pathname !== routes.login && (
          <Button variant="outline" onClick={() => signIn()}>
            Login
          </Button>
        )}
        {session && (
          <HStack>
            {router.pathname !== routes.admin.dashboard && (
              <Link href={routes.admin.dashboard}>Dashboard</Link>
            )}
            <Button variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          </HStack>
        )}
      </HStack>
      <Box
        minH="100vh"
        h="100%"
        paddingTop={router.pathname === routes.home ? "0" : "6rem"}
      >
        {children}
      </Box>
    </Box>
  );
}

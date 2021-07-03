import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { Provider } from "next-auth/client";
import NProgress from "nprogress";
import router from "next/router";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && NProgress.start();
    const handleComplete = (url: string) =>
      url === router.asPath && NProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;

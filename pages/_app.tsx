import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { Provider } from "next-auth/client";
import NProgress from "nprogress";
import router from "next/router";
import "nprogress/nprogress.css";
import { myTheme } from "../styles/theme";
import Head from "next/head";

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
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={myTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Provider>
    </>
  );
}
export default MyApp;

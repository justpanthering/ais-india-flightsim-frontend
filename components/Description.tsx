import { Box, Grid } from "@chakra-ui/layout";
import React from "react";

interface Props {
  title: string;
  description: React.ReactNode;
  verify?: boolean;
}

export default function Description({
  title,
  description,
  verify = true,
}: Props): JSX.Element {
  return (
    <Grid templateColumns="1fr 2fr" gap={10} w="100%">
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        {title}:
      </Box>
      <Box style={{ display: "flex", justifyContent: "flex-start" }}>
        {verify ? description : "--"}
      </Box>
    </Grid>
  );
}

import { Box } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  description: React.ReactNode;
  verify?: boolean;
  isDividerRequired?: boolean;
}

export default function Description({
  title,
  description,
  verify = true,
  isDividerRequired = true,
}: Props): JSX.Element {
  return (
    <>
      <Box display="flex" w="100%">
        <Box
          w="30%"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          {title}&nbsp;
        </Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          w="10%"
        >
          <span>:</span>
        </Box>
        <Box
          w="60%"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          {verify ? description : "--"}
        </Box>
      </Box>
      {isDividerRequired && <Divider />}
    </>
  );
}

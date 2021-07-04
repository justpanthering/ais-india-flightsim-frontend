import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: React.ReactNode;
  actions?: React.ReactNode[];
  children: React.ReactNode;
}

export default function GroupWithHeader({
  title,
  actions,
  children,
}: Props): JSX.Element {
  return (
    <VStack alignItems="start" marginBottom="1rem" spacing="0">
      <HStack
        bg="secondary"
        w="100%"
        h="100%"
        p="1rem 2rem"
        justifyContent="space-between"
      >
        <Box color="white">{title}</Box>
        <HStack>
          {(actions || []).map((actionElement, i) => (
            <Box marginLeft="5px" key={`groupWithHeader_action_${i}`}>
              {actionElement}
            </Box>
          ))}
        </HStack>
      </HStack>
      <Box
        p="1rem 2rem"
        border="1px solid #33869C"
        borderRadius="0 0 10px 10px"
        w="100%"
        marginTop="0"
      >
        {children}
      </Box>
    </VStack>
  );
}

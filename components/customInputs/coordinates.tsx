import {
  HStack,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  value?: {
    latitude: {
      measurement: number;
      hemisphere: "N" | "S";
    };
    longitude: {
      measurement: number;
      hemisphere: "E" | "W";
    };
  };
  onChange?: (val: {
    latitude: {
      measurement: number;
      hemisphere: "N" | "S";
    };
    longitude: {
      measurement: number;
      hemisphere: "E" | "W";
    };
  }) => void;
  id?: string;
}
export default function Coordinates({
  value,
  onChange,
  id,
}: Props): JSX.Element {
  const { latitude, longitude } = value || {};
  return (
    <HStack id={id} width="100%">
      <InputGroup size="md">
        <NumberInput
          placeholder="Latitude"
          value={latitude?.measurement}
          onChange={(val) => {
            if (onChange) {
              onChange({
                latitude: {
                  hemisphere: latitude?.hemisphere || "N",
                  measurement: Number(val),
                },
                longitude: {
                  hemisphere: longitude?.hemisphere || "E",
                  measurement: Number(longitude?.measurement || 0),
                },
              });
            }
          }}
          step={0.5}
        >
          <NumberInputField w="300px" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <InputRightAddon>
          <span>&#176;</span>
        </InputRightAddon>
        <Select
          value={latitude?.hemisphere || "N"}
          onChange={(e) => {
            const val = e.target.value as "N" | "S";
            if (onChange) {
              onChange({
                latitude: {
                  hemisphere: val,
                  measurement: Number(latitude?.measurement || 0),
                },
                longitude: {
                  hemisphere: longitude?.hemisphere || "E",
                  measurement: Number(longitude?.measurement || 0),
                },
              });
            }
          }}
        >
          <option value="N">North</option>
          <option value="S">South</option>
        </Select>
      </InputGroup>
      <InputGroup size="md">
        <NumberInput
          placeholder="Longitude"
          value={longitude?.measurement}
          onChange={(val) => {
            if (onChange) {
              onChange({
                latitude: {
                  hemisphere: latitude?.hemisphere || "N",
                  measurement: Number(latitude?.measurement || 0),
                },
                longitude: {
                  hemisphere: longitude?.hemisphere || "E",
                  measurement: Number(val),
                },
              });
            }
          }}
          step={0.5}
        >
          <NumberInputField w="300px" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <InputRightAddon>
          <span>&#176;</span>
        </InputRightAddon>
        <Select
          value={longitude?.hemisphere}
          onChange={(e) => {
            const val = e.target.value as "E" | "W";
            if (onChange) {
              onChange({
                latitude: {
                  hemisphere: latitude?.hemisphere || "N",
                  measurement: Number(latitude?.measurement || 0),
                },
                longitude: {
                  hemisphere: val,
                  measurement: Number(longitude?.measurement || 0),
                },
              });
            }
          }}
        >
          <option value="E">East</option>
          <option value="W">West</option>
        </Select>
      </InputGroup>
    </HStack>
  );
}

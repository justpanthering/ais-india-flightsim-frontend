import { useToast } from "@chakra-ui/react";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import { getAirportList } from "../api-client/airport";
import { Airport } from "../types";

export default function useAirports() {
  const [airports, setAirports] = useState<Airport[]>();
  const [searchQuery, setSearchQuery] = useState<string>();

  const toast = useToast();

  const handleSearchQuery = useCallback(async (val) => {
    try {
      const res = await getAirportList(val);
      setAirports(res.data);
    } catch (e) {
      console.error(e);
      toast({
        title: "Unable to get airport list",
        description: e.message,
        status: "error",
        isClosable: true,
      });
    }
  }, []);

  const handleSearchQueryDebounce = useRef(debounce(handleSearchQuery, 500));

  useEffect(() => {
    console.log("query changed");
    handleSearchQueryDebounce.current(searchQuery);
  }, [searchQuery]);

  function handleChangeQuery(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return {
    airports,
    handleChangeQuery,
  };
}

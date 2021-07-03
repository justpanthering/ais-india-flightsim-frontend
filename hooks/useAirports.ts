import { useToast } from "@chakra-ui/react";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import { getAirportList } from "../api-client/airport";
import { AirportListItem } from "../types";

export default function useAirports(): {
  filteredAirports: AirportListItem[];
  searchQuery?: string;
  handleChangeQuery?: (val: ChangeEvent<HTMLInputElement>) => void;
  isFetching?: boolean;
} {
  const [filteredAirports, setFilteredAirports] = useState<AirportListItem[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>();

  const toast = useToast();

  const handleSearchQuery = useCallback(async (val: string) => {
    setIsFetching(true);
    try {
      const airports = await getAirportList(val);
      setFilteredAirports(airports);
    } catch (e) {
      console.error(e);
      toast({
        title: "Unable to get airport list",
        description: e.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleSearchQueryDebounce = useRef(debounce(handleSearchQuery, 500));

  useEffect(() => {
    if (searchQuery) {
      handleSearchQueryDebounce.current(searchQuery);
    } else {
      if (filteredAirports.length) {
        handleSearchQueryDebounce.current.cancel;
        setFilteredAirports([]);
      }
    }
  }, [searchQuery]);

  function handleChangeQuery(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return {
    filteredAirports,
    searchQuery,
    handleChangeQuery,
    isFetching,
  };
}

import { useEffect, useState } from "react";
import { ILogin } from "../types";

export default function useLogin() {
  const [error, setError] = useState<string>();
  const [authData, setAuthData] = useState<ILogin>();

  useEffect(() => console.log("upadted authData: ", authData), [authData]);

  return { error, setError, authData, setAuthData };
}

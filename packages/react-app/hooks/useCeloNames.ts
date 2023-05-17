import { Masa, SoulNameDetails } from "@masa-finance/masa-sdk";
import { useEffect, useState } from "react";

export const useCeloNames = (masa?: Masa) => {
  const [names, setNames] = useState<SoulNameDetails[]>();
  const [isLoading, setLoading] = useState(false);
  const getNames = async () => {
    if (masa) {
      setLoading(true);
      const names = await masa.soulName.list();

      setNames(names);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getNames();
  }, [masa]);

  return { names, isLoading };
};

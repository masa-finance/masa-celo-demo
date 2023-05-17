import { MasaContext } from "@/contexts/masa-context";
import { shortenAddress } from "@/helpers/shortenString";
import { useCeloNames } from "@/hooks/useCeloNames";
import { Masa } from "@masa-finance/masa-sdk";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useSigner } from "wagmi";

interface MasaProviderProps {
  children: JSX.Element;
}
export const MasaProvider = ({ children }: MasaProviderProps) => {

  const [masa, setMasa] = useState<Masa>();
  
  // dev-rels: Using wagmi hooks to load different components such as the signer ( required for masa-sdk to work ) and the address for internal usage
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const shortAddress = useMemo(() => {
    if (address) {
      return shortenAddress(address);
    }
  }, [address]);

  // dev-rels: This method creates and returns a masa-sdk instance ( which allows us to access to masa's tools ) NOTE: networkName can be updated with the current connected network
  const createMasa = (masaSigner: any) => {
    return new Masa({
      wallet: masaSigner,
      networkName: "celo",
      environment: "dev",
    });
  };

  // dev-rels: This triggers masa-sdk instance creation when there is a signer properly connected
  useEffect(() => {
    if (!masa && signer) {
      setMasa(createMasa(signer));
    }
  }, [signer, setMasa]);

  // dev-rels: Importing celo names from hook
  const { names, isLoading } = useCeloNames(masa);

  const namesList = useMemo(() => {
    return names?.map((name) => name.metadata.name) ?? [];
  }, [names]);

  const context = {
    masa,
    names: namesList,
    isNamesLoading: isLoading,
    address,
    shortAddress,
  };

  return (
    <MasaContext.Provider value={context}>{children}</MasaContext.Provider>
  );
};

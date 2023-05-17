import { MasaContext } from "@/contexts/masa-context";
import { shortenAddress } from "@/helpers/shortenAddress";
import { useCeloNames } from "@/hooks/useCeloNames";
import { useUpdateValueById } from "@/hooks/useUpdateValueById";
import { Masa } from "@masa-finance/masa-sdk";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { Signer } from "ethers";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";

interface MasaProviderProps {
  children: JSX.Element;
}
export const MasaProvider = ({ children }: MasaProviderProps) => {
  const [masa, setMasa] = useState<Masa>();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const shortAddress = useMemo(() => {
    if (address) {
      return shortenAddress(address);
    }
  }, [address]);

  const createMasa = (masaSigner: any) => {
    return new Masa({
      wallet: masaSigner,
      networkName: "celo",
      environment: "dev",
      verbose: true,
    });
  };

  useEffect(() => {
    if (!masa && signer) {
      setMasa(createMasa(signer));
    }
  }, [signer, setMasa]);

  const { names, isLoading } = useCeloNames(masa);

  const namesList = useMemo(() => {
    return names?.map((name) => name.metadata.name) ?? [];
  }, [names]);

  // useUpdateValueById(
  //   "rk_profile_title",
  //   names && namesList.length > 0 ? namesList[0] : ""
  // );

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

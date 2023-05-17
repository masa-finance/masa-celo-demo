export interface MasaShape {
  children?: React.ReactNode;

  // Wagmi
  address?: string;
  shortAddress?: string

  // Names
  names?: string[];
  isNamesLoading?: boolean;
}

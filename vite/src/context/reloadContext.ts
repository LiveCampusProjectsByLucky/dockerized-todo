import { createContext } from "react";

export interface ReloadContextI {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialReloadState = {
  reload: false,
  setReload: () => {},
};

export default createContext<ReloadContextI>(initialReloadState);
import { Store } from "./Store";
import { useContext, createContext } from "react";

export const StoreContext = createContext<Store>({} as Store);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): Store => useContext(StoreContext);

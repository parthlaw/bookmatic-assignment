import { createContext, useState } from "react";

interface ContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  user:Object;
  setUser: React.Dispatch<React.SetStateAction<Object>>;
  transactions:Array<ITransactions>;
  setTransactions: React.Dispatch<React.SetStateAction<Array<ITransactions>>>;
}
interface ITransactions {
  partyName: string;
  amount: string;
  type: string;
}
const emptyContext: ContextType = {} as ContextType;
export const ContextProvider = createContext<ContextType>(emptyContext);
export const Context = (props: any) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({})
  const [transactions, setTransactions] = useState<Array<ITransactions>>([]);
  return (
    <ContextProvider.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        modal,
        setModal,
        user,
        setUser,
        transactions,
        setTransactions
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

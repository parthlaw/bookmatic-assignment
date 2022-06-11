import React, { useContext, useEffect } from "react";
import "./Dashboard.css";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import { ContextProvider } from "../../context";
import Auth from "../../utils/Auth";
import { getTransactions, logout } from "../../api";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { setModal, setLoading, transactions, setTransactions, setAuth } =
    useContext(ContextProvider);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTransactionsList = async () => {
      setLoading(true);
      const data = await getTransactions(token as string);
      setLoading(false);
      console.log(data);

      if (data?.data.success) {
        console.log("Success", data.data.data.transactions);

        setTransactions(data.data.data.transactions);
      }
    };
    if (token) {
      getTransactionsList();
    }
  }, []);
  const onClickCreate = () => {
    setModal(true);
  };
  const onClickLogout = async () => {
    localStorage.removeItem("token");
    try {
      setLoading(true);
      const data = await logout();
      setLoading(false);
      if (data?.data.success) {
        toast.success(data.data.message);
        setAuth(false);
      } else {
        toast.error(data.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Auth>
        <div className="container">
          <div className="top-bar">
            <button className="btn create" onClick={onClickCreate}>
              Create
            </button>
          </div>
          {/* <div className="card">
            <div className="card-header">
              <span>3000</span>
            </div>
            <div className="icon">
              <BsArrowDownSquare color="green" fontSize="30px" />
            </div>
            <div className="card-body">
              <span>Hari Singh</span>
            </div>
          </div> */}
          <div className="list">
            {transactions.length > 0 ? (
              transactions.map((tr, i) => {
                return (
                  <div className="card">
                    <div className="card-header">
                      <span>{tr.amount}</span>
                    </div>
                    <div className="icon">
                      {tr.type === "recieved" ? (
                        <BsArrowDownSquare color="green" fontSize="30px" />
                      ) : (
                        <BsArrowUpSquare color="red" fontSize="30px" />
                      )}
                    </div>
                    <div className="card-body">
                      <span>{tr.partyName}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-transactions">No Transactions</div>
            )}
          </div>
          <div className="top-bar">
            <button className="btn create" onClick={onClickLogout}>
              Logout
            </button>
          </div>
        </div>
      </Auth>
    </>
  );
};

export default Dashboard;

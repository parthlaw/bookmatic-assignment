import React, { useContext, useState } from "react";
import "./Form.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { ContextProvider } from "../../context";
import { createTransaction } from "../../api";
import { toast } from "react-toastify";
const Form = () => {
  const { setModal,setTransactions, transactions,setLoading } = useContext(ContextProvider);
  interface IForm{
    partyName: string;
    amount: string;
    type: string;
  }
  const [formData, setFormData] = useState<IForm>({} as IForm)
  const onClickClose = () => {
    setModal(false);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onClickSubmit = async() => {
    console.log("Submit",formData);
    setLoading(true)
    const token=localStorage.getItem("token")
    const data=await createTransaction(formData,token as string)
    setLoading(false)
    if(data?.data.success){
      toast.success(data.data.message)
      setTransactions([...transactions,formData])
      setModal(false);
    }else{
      toast.error(data?.data.message)
    }
  }
  return (
    <div className="form-container">
      <div className="form">
        <div className="close">
          <AiFillCloseCircle fontSize="30px" onClick={onClickClose} />
        </div>
        <div className="form-header">
          <h1>Create a new Transaction</h1>
        </div>
        <div className="form-body">
          <div className="input">
            <label>Party Name</label>
            <input type="text" name="partyName" value={formData.partyName} onChange={onInputChange} />
          </div>
          <div className="input">
            <label>Amount</label>
            <input type="text" name="amount" value={formData.amount} onChange={onInputChange} />
          </div>
          <div className="input" onChange={onInputChange}>
            <label>Transaction Type</label>
            <input type="radio" name="type" id="paid" value="paid" />
            <label htmlFor="paid">Paid</label>
            <input type="radio" name="type" id="received" value="recieved" />
            <label htmlFor="received">Received</label>
          </div>
          <button className="btn submit" onClick={onClickSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Form;

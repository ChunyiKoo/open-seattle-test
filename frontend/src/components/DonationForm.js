import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkAddNewDonation } from "../store/donation";

const TYPES = ["money", "clothing", "food"];

export default function DonationForm() {
 const [name, setName] = useState("");
 const [type, setType] = useState("");
 const [amount, setAmount] = useState(0);
 const [date, setDate] = useState(
  new Date(new Date().toLocaleDateString()).toJSON().slice(0, 10)
 );
 const [errors, setErrors] = useState([]);

 const navigate = useNavigate();
 const dispatch = useDispatch();

 useEffect(() => {
  let errs = [];
  if (name.length < 3) errs.push("Name must be 3 or more characters");
  if (name.length > 30) errs.push("Name must be 30 characters or less");
  if (amount < 1) errs.push("Amount must be a positive number");
  setErrors(errs);
 }, [name, amount]);

 const handleSubmit = (e) => {
  e.preventDefault();
  try {
   dispatch(ThunkAddNewDonation({ name, type, amount, date }));
  } catch (err) {
   console.error("Error:", err);
  }
  navigate("/");
 };

 return (
  <form className="donation-form" onSubmit={handleSubmit}>
   <h2>Add a Donation</h2>
   <label>
    Name
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
   </label>
   <label>
    Select a donation type
    <select value={type} onChange={(e) => setType(e.target.value)}>
     {TYPES.map((donationType, idx) => (
      <option key={idx} value={donationType}>
       {donationType}
      </option>
     ))}
    </select>
   </label>
   <label>
    Amount
    <input
     type="number"
     value={amount}
     onChange={(e) => setAmount(e.target.value)}
    />
   </label>
   <label>
    Date
    <input
     type="date"
     value={date}
     max={new Date(new Date().toLocaleDateString()).toJSON().slice(0, 10)}
     onChange={(e) => setDate(e.target.value)}
    />
   </label>
   <button type="submit" disabled={errors.length > 0}>
    Submit
   </button>
  </form>
 );
}

import { ThunkPopulateDonation } from "./store/donation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
 Navigation,
 DonationList,
 DonationForm,
 InventoryReport,
 DonatorReport,
} from "./components";
import { Route, Routes } from "react-router-dom";

function App() {
 const dispatch = useDispatch();
 const [isLoaded, setIsLoaded] = useState(false);
 useEffect(() => {
  console.log("1st line inside useEffect of App.js");
  try {
   console.log("try block ThunkPopulateDonation");
   dispatch(ThunkPopulateDonation()).then(() => setIsLoaded(true));
  } catch (err) {
   console.error("Error:", err);
  }
 }, [dispatch]);

 return (
  <>
   <h1>Open Seattle</h1>
   <Navigation />
   <Routes>
    {isLoaded && <Route exact path="/" element={<DonationList />} />}
    {isLoaded && (
     <Route exact path="/add-donation" element={<DonationForm />} />
    )}
    {isLoaded && (
     <Route exact path="/inventory-report" element={<InventoryReport />} />
    )}
    {isLoaded && (
     <Route exact path="/donator-report" element={<DonatorReport />} />
    )}
   </Routes>
  </>
 );
}

export default App;

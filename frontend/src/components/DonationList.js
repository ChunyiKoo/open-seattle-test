import { useSelector } from "react-redux";

function DonationList() {
 let donationsArr = useSelector((state) => state.donation);

 //const donationsArr = Object.values(donations);

 let one_donation = [];
 if (donationsArr.length > 0) one_donation = donationsArr[0];
 //console.log("one_donation", one_donation);
 //  const getTableHeader = () => {
 //   let header = Object.keys(donationsArr[0]);
 //   return header.map((key, index) => <th key={index}>{key}</th>);
 //  };

 //  const getTableData = () => {
 //   return donationsArr.map((row) => {
 //    return (
 //     <tr key={row.id}>
 //      <td>{row.id}</td>
 //      <td>{row.name}</td>
 //      <td>{row.type}</td>
 //      <td>{row.date}</td>
 //      <td>{row.amount}</td>
 //     </tr>
 //    );
 //   });
 //  };
 if (donationsArr.length === 0) return "no records";
 else
  return (
   <div className="donation-list">
    <h2>Donation List</h2>
    <table>
     <thead>
      <tr>
       {Object.keys(one_donation).map((key, index) => (
        <th key={index}>{key}</th>
       ))}
      </tr>
     </thead>
     <tbody>
      {donationsArr.map((row) => {
       return (
        <tr key={row.id}>
         <td>{row.id}</td>
         <td>{row.name}</td>
         <td>{row.type}</td>
         <td>{row.amount}</td>
         <td>{row.date}</td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </div>
  );
}

export default DonationList;

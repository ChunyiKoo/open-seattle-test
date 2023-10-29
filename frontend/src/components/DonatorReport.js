import { useSelector } from "react-redux";

export default function DonatorReport() {
 let donationsArr = useSelector((state) => state.donation);

 let donator = {};
 for (let donation of donationsArr) {
  if (donator[donation.name] === undefined)
   donator[donation.name] = parseInt(donation.amount);
  else donator[donation.name] += parseInt(donation.amount);
 }

 const names = Object.keys(donator);

 return (
  <div className="donator-report">
   <h2>Donator Report</h2>
   <table>
    <thead>
     <tr>
      {["Name", "Total Amount"].map((key, index) => (
       <th key={index}>{key}</th>
      ))}
     </tr>
    </thead>
    <tbody>
     {names.map((name, i) => {
      return (
       <tr key={i}>
        <td>{name}</td>
        <td>{donator[name]}</td>
       </tr>
      );
     })}
    </tbody>
   </table>
  </div>
 );
}

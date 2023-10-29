import { useSelector } from "react-redux";

export default function InventoryReport() {
 let donationsArr = useSelector((state) => state.donation);

 let inventory = {};
 for (let donation of donationsArr) {
  if (inventory[donation.type] === undefined)
   inventory[donation.type] = parseInt(donation.amount);
  else inventory[donation.type] += parseInt(donation.amount);
 }

 const types = Object.keys(inventory);

 return (
  <div className="inventory-report">
   <h2>Inventory Report</h2>
   <table>
    <thead>
     <tr>
      {["Type", "Total Amount"].map((key, index) => (
       <th key={index}>{key}</th>
      ))}
     </tr>
    </thead>
    <tbody>
     {types.map((type, i) => {
      return (
       <tr key={i}>
        <td>{type}</td>
        <td>{inventory[type]}</td>
       </tr>
      );
     })}
    </tbody>
   </table>
  </div>
 );
}

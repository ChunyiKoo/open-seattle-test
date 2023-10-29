const POPULATE = "donation/POPULATE";
const ADD_NEW_DONATION = "donation/ADD_NEW_DONATION";

export const populateDonation = (donations) => {
 return {
  type: POPULATE,
  donations,
 };
};

export const addNewDonation = (newDonation) => {
 return {
  type: ADD_NEW_DONATION,
  newDonation,
 };
};

export const ThunkPopulateDonation = () => async (dispatch) => {
 const res = await fetch("http://localhost:8081/");
 if (res.ok) {
  const data = await res.json();
  dispatch(populateDonation(data));
 } else {
  throw new Error("Network response was not ok --- ThunkPopulateDonation");
 }
};

export const ThunkAddNewDonation = (donation_no_id) => async (dispatch) => {
 const res = await fetch("http://localhost:8081/donations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(donation_no_id),
 });

 if (res.ok) {
  const newDonation = await res.json();
  dispatch(addNewDonation(newDonation));
 } else {
  throw new Error("Network response was not ok --- ThunkAddNewDonation");
 }
};

const initialState = [];

export default function donationReducer(state = initialState, action) {
 let newState;
 switch (action.type) {
  case POPULATE:
   newState = [...action.donations];
   return newState;
  case ADD_NEW_DONATION:
   newState = [...state];
   newState[action.newDonation.id - 1] = action.newDonation;
   return newState;
  default:
   return state;
 }
}

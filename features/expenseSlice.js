import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export function getTimestamp(date) {
  return new Date(date).getTime();
}
const dummyExpenses = [
  {
    id: "e1",
    title: "shoes",
    amount: 200,
    date: getTimestamp("2023-05-19"),
  },
  {
    id: "e2",
    title: "Willys",
    amount: 134,
    date: getTimestamp("2023-05-25"),
  },
  {
    id: "e3",
    title: "ICA",
    amount: 120,
    date: getTimestamp("2023-05-25"),
  },
  {
    id: "e4",
    title: "Ticket",
    amount: 829,
    date: getTimestamp("2023-06-1"),
  },
  {
    id: "e5",
    title: "shoes",
    amount: 200,
    date: getTimestamp("2023-05-19"),
  },
  {
    id: "e6",
    title: "Willys",
    amount: 134,
    date: getTimestamp("2023-05-25"),
  },
  {
    id: "e7",
    title: "ICA",
    amount: 120,
    date: getTimestamp("2023-05-25"),
  },
  {
    id: "e8",
    title: "Ticket",
    amount: 829,
    date: getTimestamp("2023-06-1"),
  },
];
const initialState = [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: dummyExpenses,
  reducers: {
    addExpense: (state, action) => {
      const id = nanoid();
      state.unshift({ id: id, ...action.payload });
    },
    deleteExpense: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateExpense: (state, action) => {
      console.log(action.payload);
      return state.map((item) =>
        item.id === action.payload.id
          ? { id: action.payload.id, ...action.payload }
          : item
      );
    },
  },
});

export const selectExpense = (state) => state.expenses;
export const addExpense = expenseSlice.actions.addExpense;
export const deleteExpense = expenseSlice.actions.deleteExpense;
export const updateExpense = expenseSlice.actions.updateExpense;
export default expenseSlice.reducer;

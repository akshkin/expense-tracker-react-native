import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteExpenses,
  getExpenses,
  storeExpense,
  updateExpenses,
} from "../utils/http";

const initialState = {
  loading: false,
  expenses: [],
  error: "",
};

export const addExpense = createAsyncThunk(
  "expense/add",
  async (expenseData) => {
    try {
      await storeExpense(expenseData);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expense/update",
  async ({ expenseId, expenseData }) => {
    try {
      const data = await updateExpenses(expenseId, expenseData);
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);
export const deleteExpense = createAsyncThunk("expense/delete", async (id) => {
  try {
    await deleteExpenses(id);
  } catch (error) {
    console.log(error.message);
    return Promise.reject(error);
  }
});
export const fetchExpenses = createAsyncThunk("expense/fetch", async () => {
  try {
    const data = await getExpenses();
    let expensesArray = [];
    for (key in data) {
      const expenseObject = {
        id: key,
        title: data[key].title,
        amount: data[key].amount,
        date: data[key].date,
      };
      expensesArray.push(expenseObject);
    }
    return expensesArray.reverse();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpenseItem(state, action) {
      state.expenses = [action.payload, ...state.expenses];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addExpense.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = "An error has occurred. Could not add expense.";
      })
      .addCase(updateExpense.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        );
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = "An error has occurred. Could not update expense.";
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = "An error has occurred";
      })
      .addCase(fetchExpenses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch expenses. Try again later";
      });
  },
});

export const addExpenseItem = expenseSlice.actions.addExpenseItem;
export const selectExpense = (state) => state.expenses.expenses;
export const loadingState = (state) => state.expenses.loading;
export const errorState = (state) => state.expenses.error;

export default expenseSlice.reducer;

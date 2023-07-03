import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  expenses: [],
  error: "",
};

export const updateExpense = createAsyncThunk(
  "expense/update",
  async ({ expenseId, expenseData, expenses }) => {
    try {
      const newExpenses = expenses?.map((expense) =>
        expense.id === expenseId ? expenseData : expense
      );
      await AsyncStorage.setItem("expenses", JSON.stringify(newExpenses));
      return newExpenses;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);
export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async ({ expenseId, expenses }) => {
    try {
      const newExpenses = expenses.filter(
        (expense) => expense.id !== expenseId
      );
      await AsyncStorage.setItem("expenses", JSON.stringify(newExpenses));
      return newExpenses;
    } catch (error) {
      console.log(error.message);
      return Promise.reject(error);
    }
  }
);
export const addExpense = createAsyncThunk(
  "expense/add",
  async ({ expenseData, expenses }) => {
    try {
      const newExpenses = [expenseData, ...expenses];
      await AsyncStorage.setItem("expenses", JSON.stringify(newExpenses));
      return newExpenses;
    } catch (error) {
      console.log(error.message);
      return Promise.reject(error);
    }
  }
);

export const getExpensesFromStorage = createAsyncThunk(
  "expense/get",
  async () => {
    try {
      const expenses = await AsyncStorage.getItem("expenses");
      return expenses && expenses.length > 0 ? JSON.parse(expenses) : [];
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addExpense.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
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
        state.expenses = action.payload;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = "An error has occurred";
      })
      .addCase(getExpensesFromStorage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getExpensesFromStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpensesFromStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch expenses. Try again later";
      });
  },
});

export const { addExpenseItem, updateExpenseItem, deleteExpenseItem } =
  expenseSlice.actions;
export const selectExpense = (state) => state.expenses.expenses;
export const loadingState = (state) => state.expenses.loading;
export const errorState = (state) => state.expenses.error;

export default expenseSlice.reducer;

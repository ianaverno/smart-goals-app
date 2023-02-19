import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  status: 'idle',
  goals: [],
  error: null
}

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    fetchGoalsStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchGoalsSuccess: (state, action) => {
      state.status = 'loaded'
      state.error = null;
      state.goals = state.goals.concat(action.payload.goals)
    },
    fetchGoalsFailure: (state, action) => {
      state.error = action.payload.error
    },
    destroyGoalStart: (state) => {
      state.status = 'destroying';
      state.error = null;
    },
    destroyGoalSuccess: (state, action) => {
      console.log("action.payload", action.payload);
      state.status = 'loaded'
      state.error = null
      state.goals = state.goals.filter(g => g.id !== action.payload.goal.id);
    },
    destroyGoalFailure: (state, action) => {
      state.status = 'loaded'
      state.error = action.payload.error
    }
  }
});


export const {
  fetchGoalsStart,
  fetchGoalsSuccess,
  fetchGoalsFailure,
  destroyGoalStart,
  destroyGoalSuccess,
  destroyGoalFailure
} = goalsSlice.actions;

const host = 'http://localhost:3000';
const goalsUrl = `${host}/api/v1/goals`;

export const fetchGoalsThunk = () => async (dispatch) => {
  try {
    dispatch(fetchGoalsStart());
    const response = await axios.get(goalsUrl);
    dispatch(fetchGoalsSuccess(response.data));
  } catch (error) {
    dispatch(fetchGoalsFailure(error.response.data));
  }
}

export const destroyGoalThunk = (url) => async (dispatch) => {
  try {
    dispatch(destroyGoalStart());
    const response = await axios.delete(url);
    dispatch(destroyGoalSuccess(response.data));
  } catch (error) {
    dispatch(destroyGoalFailure(error.response.data));
  }
}

// export const createGoalThunk = (goalData) => async (dispatch) => {
//   try {
//     dispatch(createGoalStart());
//     const newGoal = await createGoal(goalData);
//     dispatch(createGoalSuccess(newGoal));
//   } catch (error) {
//     dispatch(createGoalFailure(error.message));
//   }
// }

export default goalsSlice.reducer;

export const selectAllGoals = (state) => state.goals.goals;

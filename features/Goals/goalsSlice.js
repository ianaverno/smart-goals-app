import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  status: 'idle',
  goals: [],
  error: null,
  errorDetails: {},
  form: false
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
      state.status = 'loaded';
      state.error = null;
      state.goals = state.goals.filter(g => g.id !== action.payload.goal.id);
    },
    destroyGoalFailure: (state, action) => {
      state.status = 'loaded';
      state.error = action.payload.error;
    },
    createGoalStart: (state) => {
      state.status = 'creating';
      state.error = null;
    },
    createGoalSuccess: (state, action) => {
      state.status = 'loaded';
      state.goals.unshift(action.payload.goal);
      state.error = null;
      state.form = false;
    },
    createGoalFailure: (state, action) => {
      console.log(action.payload);
      state.status = 'loaded';
      state.error = action.payload.error
      state.errorDetails = action.payload.details
    },
    updateStatStart: (state) => {
      state.status = 'updating';
      state.error = null;
    },
    updateStatSuccess: (state, action) => {
      const goal = state.goals.find(goal => goal.id == action.payload.stat.goal_id);
      if (goal) {
        const stat = goal.stats.find(stat => stat.id == action.payload.stat.id)
        if (stat) {
          stat.value = action.payload.stat.value
        }
      } 
      
      state.status = 'loaded';
      state.error = null;
    },
    updateStatFailure: (state, action) => {

    },
    toggleForm: (state) => {
      state.error = null;
      state.errorDetails = {};
      state.form = !state.form
    },
    removeErrorDetails: (state, action) => {
      console.log(action.payload);
      state.errorDetails[action.payload] = null;
    }
}});


export const {
  fetchGoalsStart,
  fetchGoalsSuccess,
  fetchGoalsFailure,
  destroyGoalStart,
  destroyGoalSuccess,
  destroyGoalFailure,
  createGoalStart,
  createGoalSuccess,
  createGoalFailure,
  updateStatStart,
  updateStatSuccess,
  updateStatFailure,
  toggleForm,
  removeErrorDetails
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

export const createGoalThunk = (payload) => async (dispatch) => {
  try {
    dispatch(createGoalStart());
    const response = await axios.post(goalsUrl, { goal: payload });
    dispatch(createGoalSuccess(response.data));
  } catch (error) {
    dispatch(createGoalFailure(error.response.data));
  }
}

export const updateStatThunk = (url, payload) => async (dispatch) => {
  try {
    console.log("reducer")
    dispatch(updateStatStart());
    const response = await axios.patch(url, { stat: payload });
    dispatch(updateStatSuccess(response.data));
  } catch (error) {
    dispatch(updateStatFailure(error.response.data));
  }
}

export default goalsSlice.reducer;

export const selectAllGoals = (state) => state.goals.goals;

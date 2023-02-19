import axios from 'axios';

const host = 'localhost:3000';
const goalsUrl = `${host}/api/v1/goals`;

export const fetchGoals = async () => {
  const response = await axios.get(goalsUrl);
  return response.data;
}

export const createGoal = async (payload) => {
  const response = await axios.post(goalsUrl, { goal: payload });
  return response.data;
}

export const destroyGoal = async (url) => {
  const response = await axios.delete(url);
  return response.data;
}
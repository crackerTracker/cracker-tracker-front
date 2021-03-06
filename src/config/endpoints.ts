export const endpoints = {
  requestAll: {
    url: '/api/pomodoro/pomodoros',
    method: 'GET',
  },
  markDone: {
    url: '/api/pomodoro/markDone',
    method: 'POST',
  },
  createPlanned: {
    url: '/api/pomodoro/createPlanned',
    method: 'POST',
  },
  deletePlanned: {
    url: '/api/pomodoro/deletePlanned',
    method: 'POST',
  },
  deleteAllPlanned: {
    url: '/api/pomodoro/deleteAllPlanned',
    method: 'POST',
  },
  editPlanned: {
    url: '/api/pomodoro/editPlanned',
    method: 'POST',
  },
  deleteDone: {
    url: '/api/pomodoro/deleteDone',
    method: 'POST',
  },
  editDone: {
    url: '/api/pomodoro/editDone',
    method: 'POST',
  },

  getAllTrackerTasks: {
    url: '/api/tracker/tasks',
    method: 'GET',
  },
  addTrackerTask: {
    url: '/api/tracker/addTask',
    method: 'POST',
  },
  editTrackerTask: {
    url: '/api/tracker/editTask',
    method: 'POST',
  },
  deleteTrackerTask: {
    url: '/api/tracker/deleteTask',
    method: 'POST',
  },
  getAllTrackerCategories: {
    url: '/api/tracker/categories',
    method: 'GET',
  },
  createTrackerCategory: {
    url: '/api/tracker/createCategory',
    method: 'POST',
  },
  editTrackerCategory: {
    url: '/api/tracker/editCategory',
    method: 'POST',
  },
  deleteTrackerCategory: {
    url: '/api/tracker/deleteCategory',
    method: 'POST',
  },
};

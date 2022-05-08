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
};

export const endpoints = {
  getTodos: {
    url: '/api/todo/todos',
    method: 'GET',
  },
  createTodo: {
    url: '/api/todo/createTodo',
    method: 'POST',
  },
  deleteTodo: {
    url: '/api/todo/deleteTodo',
    method: 'POST',
  },
  editTodo: {
    url: '/api/todo/editTodo',
    method: 'POST',
  },

  getGroups: {
    url: '/api/todo/groups',
    method: 'GET',
  },
  createGroup: {
    url: '/api/todo/createGroup',
    method: 'POST',
  },
  deleteGroup: {
    url: '/api/todo/deleteGroup',
    method: 'POST',
  },
  editGroup: {
    url: '/api/todo/editGroup',
    method: 'POST',
  },

  resetAll: {
    url: '/api/todo/reset',
    method: 'POST',
  },
};

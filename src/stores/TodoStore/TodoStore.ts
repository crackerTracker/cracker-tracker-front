import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import 'moment/locale/ru';
import { TodosToggleEnum, weekPageHeaderDateFormat } from 'config/todo';
import RootStore from 'stores/RootStore';
import { getAuthHeader } from 'utils/getAuthHeader';
import { request } from 'utils/request';
import { endpoints } from './endpoints';
import { SubtodoType, TodoGroupType, TodoType } from './types';

type PrivateFields = 'rootStore';

class TodoStore {
  private rootStore: RootStore;

  public isLoading = false;

  // current date in header of week page like 'июнь 2022'
  public headerDate = String(
    moment(new Date()).format(weekPageHeaderDateFormat)
  );

  public currentTodosToggle = TodosToggleEnum.all;

  public tempSubTodos: SubtodoType[] = [];
  public tempTodoName = '';

  private _todos: TodoType[] = [];

  public groups: TodoGroupType[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  get token() {
    return this.rootStore.authStore.token;
  }

  get todos() {
    return this._todos;
  }

  get toggleTodoItems() {
    switch (this.currentTodosToggle) {
      case TodosToggleEnum.all:
        return this.todos;

      case TodosToggleEnum.withDate:
        return this.todos.filter((t) => t.deadline);

      case TodosToggleEnum.withoutDate:
        return this.todos.filter((t) => !t.deadline);
    }
  }

  getLastAddedGroup = () => {
    return this.groups[this.groups.length - 1];
  };

  setTodosToggle = (toggle: TodosToggleEnum) => {
    this.currentTodosToggle = toggle;
  };

  setTempTodoName = (name: string) => {
    this.tempTodoName = name;
  };

  setTempSubTodos = (subTodos: SubtodoType[]) => {
    this.tempSubTodos = subTodos;
  };

  setHeaderDate = (date: string) => {
    this.headerDate = date;
  };

  setGroups = (groups: TodoGroupType[]) => {
    this.groups = groups;
  };

  requestTodos = async () => {
    this.isLoading = true;

    try {
      const data = await request({
        url: endpoints.getTodos.url,
        method: endpoints.getTodos.method,
        headers: { Authorization: `Bearer ${this.token}` },
      });

      runInAction(() => {
        if (data) {
          this._todos = data;
        }
      });
    } catch (e: any) {
      console.log('TodoStore.getTodos', e.message);
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };

  createTodo = async (
    name: string,
    done?: boolean,
    deadline?: string | null,
    note?: string,
    isImportant?: boolean,
    today?: boolean,
    groupId?: string | null,
    subTodos?: { name: string; done?: boolean }[]
  ) => {
    try {
      await request({
        url: endpoints.createTodo.url,
        method: endpoints.createTodo.method,
        headers: { Authorization: `Bearer ${this.token}` },
        body: {
          name,
          done,
          deadline,
          note,
          isImportant,
          today,
          groupId,
          subTodos,
        },
      });

      await this.requestTodos();

      runInAction(() => {
        this.tempTodoName = '';
      });
    } catch (e: any) {
      console.log('TodoStore.createTodo', e.message);
    }
  };

  editTodo = async (
    toEditId: string,
    name?: string,
    done?: boolean,
    deadline?: string | null,
    note?: string,
    isImportant?: boolean,
    today?: boolean,
    groupId?: string | null,
    subTodos?: { name: string; done?: boolean }[]
  ) => {
    try {
      const data: TodoType = await request({
        url: endpoints.editTodo.url,
        method: endpoints.editTodo.method,
        headers: { Authorization: `Bearer ${this.token}` },
        body: {
          toEditId,
          name,
          done,
          deadline,
          note,
          isImportant,
          today,
          groupId,
          subTodos,
        },
      });

      if (data) {
        await this.requestTodos();
      }
    } catch (e: any) {
      console.log('TodoStore.editTodo', e.message);
    }
  };

  deleteTodo = async (toDeleteId: string) => {
    try {
      await request({
        url: endpoints.deleteTodo.url,
        method: endpoints.deleteTodo.method,
        headers: { Authorization: `Bearer ${this.token}` },
        body: { toDeleteId },
      });

      await this.requestTodos();
    } catch (e: any) {
      console.log('TodoStore.deleteTodo', e.message);
    }
  };

  getGroups = async () => {
    try {
      const data: TodoGroupType[] = await request({
        ...endpoints.getGroups,
        headers: getAuthHeader(this.token),
      });

      if (data) {
        this.setGroups(data);
      }
    } catch (e: any) {
      console.log('TodoStore.getGroups', e.message);
    }
  };

  createGroup = async (name: string) => {
    try {
      const data: TodoGroupType = await request({
        ...endpoints.createGroup,
        body: { name },
        headers: getAuthHeader(this.token),
      });

      if (data) {
        await this.getGroups();
      }
    } catch (e: any) {
      console.log('TodoStore.createGroup', e.message);
    }
  };

  findTodoById = (todoId: string): TodoType => {
    return this.todos.find(({ _id }) => _id === todoId) || ({} as TodoType);
  };

  deleteFromGroup = async (todoId: string) => {
    try {
      await this.editTodo(
        todoId,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        null
      );
    } catch (e: any) {
      console.log('TodoStore.deleteFromGroup', e.message);
    }
  };

  deleteGroup = async (toDeleteId: string) => {
    try {
      const data: TodoGroupType = await request({
        ...endpoints.deleteGroup,
        body: { toDeleteId },
        headers: getAuthHeader(this.token),
      });

      if (data) {
        await this.getGroups();
        await this.requestTodos();
      }
    } catch (e: any) {
      console.log('TodoStore.deleteGroup', e.message);
    }
  };
}

export default TodoStore;

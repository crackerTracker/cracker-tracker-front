import { TodosToggleEnum, weekPageHeaderDateFormat } from 'config/todo';
import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import 'moment/locale/ru';
import RootStore from 'stores/RootStore';
import request from 'utils/request';
import { endpoints } from './endpoints';
import { SubtodoType, TodoType } from './types';

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

  public toggleTodoItems = this._todos;

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

  setToggleTodoItems = async () => {
    await this.requestTodos();

    switch (this.currentTodosToggle) {
      case TodosToggleEnum.all:
        this.toggleTodoItems = this.todos;
        break;

      case TodosToggleEnum.withDate:
        this.toggleTodoItems = this.todos.filter((t) => t.deadline);
        break;

      case TodosToggleEnum.withoutDate:
        this.toggleTodoItems = this.todos.filter((t) => !t.deadline);
        break;
    }
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

    this.isLoading = false;
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

      await this.setToggleTodoItems();

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
      await request({
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

      await this.requestTodos();
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

      await this.setToggleTodoItems();
    } catch (e: any) {
      console.log('TodoStore.deleteTodo', e.message);
    }
  };
}

export default TodoStore;

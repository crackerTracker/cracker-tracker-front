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

  public headerDate = String(moment(new Date()).format('MMMM Y'));

  public todosToggle = 0;

  public tempSubTodos: SubtodoType[] = [];
  public tempTodoName = '';

  private _todos: TodoType[] = [];

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

  setTodosToggle(toggle: number) {
    this.todosToggle = toggle;
  }

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
      runInAction(() => {
        this.isLoading = false;
      });
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

      this.requestTodos();

      this.tempTodoName = '';
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

      this.requestTodos();
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

      this.requestTodos();
    } catch (e: any) {
      console.log('TodoStore.deleteTodo', e.message);
    }
  };
}

export default TodoStore;

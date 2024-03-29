import AuthStore from './AuthStore';
import PomodoroStore from './PomodoroStore/PomodoroStore';
import TrackerStore from './TrackerStore/TrackerStore';
import NavbarStore from './NavbarStore/NavbarStore';
import TodoStore from './TodoStore/TodoStore';

class RootStore {
  navbarStore = new NavbarStore(this);
  authStore = new AuthStore(this);
  todoStore = new TodoStore(this);
  pomodoroStore = new PomodoroStore(this);
  trackerStore = new TrackerStore(this);
}

export default RootStore;

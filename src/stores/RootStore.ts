import AuthStore from './AuthStore';
import PomodoroStore from './PomodoroStore';
import TestStore from './TestStore';
import TestStore2 from './TestStore2';
import TrackerStore from './TrackerStore/TrackerStore';
import NavbarStore from './NavbarStore/NavbarStore';
import TodoStore from './TodoStore/TodoStore';

class RootStore {
  testStore = new TestStore(this);
  testStore2 = new TestStore2(this);
  navbarStore = new NavbarStore(this);
  authStore = new AuthStore(this);
  todoStore = new TodoStore(this);
  pomodoroStore = new PomodoroStore(this);
  trackerStore = new TrackerStore(this);
}

export default RootStore;

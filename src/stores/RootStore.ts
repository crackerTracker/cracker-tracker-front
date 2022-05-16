import AuthStore from './AuthStore';
import PomodoroStore from './PomodoroStore';
import TestStore from './TestStore';
import TestStore2 from './TestStore2';
import TrackerStore from './TrackerStore/TrackerStore';
import NavbarStore from './NavbarStore/NavbarStore';

class RootStore {
  testStore = new TestStore(this);
  testStore2 = new TestStore2(this);
  navbarStore = new NavbarStore(this);
  authStore = new AuthStore(this);
  pomodoroStore = new PomodoroStore(this);
  trackerStore = new TrackerStore(this);
}

export default RootStore;

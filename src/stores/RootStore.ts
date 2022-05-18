import AuthStore from './AuthStore';
import PomodoroStore from './PomodoroStore';
import TrackerStore from './TrackerStore/TrackerStore';
import NavbarStore from './NavbarStore/NavbarStore';

class RootStore {
  navbarStore = new NavbarStore(this);
  authStore = new AuthStore(this);
  pomodoroStore = new PomodoroStore(this);
  trackerStore = new TrackerStore(this);
}

export default RootStore;

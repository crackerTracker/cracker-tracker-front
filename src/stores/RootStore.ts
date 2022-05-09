import AuthStore from './AuthStore';
import PomodoroStore from './PomodoroStore';
import TestStore from './TestStore';
import TestStore2 from './TestStore2';

class RootStore {
  testStore = new TestStore(this);
  testStore2 = new TestStore2(this);
  authStore = new AuthStore(this);
  pomodoroStore = new PomodoroStore(this);
}

export default RootStore;

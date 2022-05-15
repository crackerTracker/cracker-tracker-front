import { makeAutoObservable } from 'mobx';
import RootStore from '../RootStore';
import { RoutesButtonConfigType, SectionButtonConfigType } from './types';

type PrivateFields = 'rootStore';

class NavbarStore {
  private rootStore: RootStore;

  public routesButtons: RoutesButtonConfigType[] | null = null;

  public sectionButtons: SectionButtonConfigType[] | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this.rootStore = rootStore;
  }

  setRoutesButtons = (routesButtons: RoutesButtonConfigType[]) => {
    this.routesButtons = routesButtons;
  };

  setSectionButtons = (sectionButtons: SectionButtonConfigType[]) => {
    this.sectionButtons = sectionButtons;
  };

  resetSectionButtons = () => {
    this.sectionButtons = null;
  };
}

export default NavbarStore;

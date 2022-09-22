import { makeAutoObservable } from 'mobx';
import RootStore from '../RootStore';
import { RoutesButtonConfigType, SectionButtonConfigType } from './types';
import { MainRoutesEnum, SectionEnumsType } from 'config/routes';

type PrivateFields = 'rootStore';

class NavbarStore {
  private rootStore: RootStore;

  public routesButtons: RoutesButtonConfigType[] | null = null;

  public sectionButtons: SectionButtonConfigType[] | null = null;

  public activeRoute: MainRoutesEnum | null = null;

  // maybe, should be set to null, when changing active route
  public activeSection: SectionEnumsType | null = null;

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
    this.activeSection = null;
  };

  setActiveRoute = (route: MainRoutesEnum | null) => {
    this.activeRoute = route;
  };

  setActiveSection = (section: SectionEnumsType | null) => {
    this.activeSection = section;
  };
}

export default NavbarStore;

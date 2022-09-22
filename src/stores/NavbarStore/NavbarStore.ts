import { makeAutoObservable } from 'mobx';
import RootStore from '../RootStore';
import { RoutesButtonConfigType, SectionButtonConfigType } from './types';
import { MainRoutesEnum, SectionEnumsType } from 'config/routes';

type PrivateFields = 'rootStore';

class NavbarStore {
  private readonly _rootStore: RootStore;

  // button representing routes
  private _routesButtons: RoutesButtonConfigType[] | null = null;

  // button representing external sections of concrete route
  private _sectionButtons: SectionButtonConfigType[] | null = null;

  private _activeRoute: MainRoutesEnum | null = null;

  // maybe, should be set to null, when changing active route
  private _activeSection: SectionEnumsType | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<this, PrivateFields>(this, {
      rootStore: false,
    });

    this._rootStore = rootStore;
  }

  get routesButtons(): RoutesButtonConfigType[] | null {
    return this._routesButtons;
  }

  get sectionButtons(): SectionButtonConfigType[] | null {
    return this._sectionButtons;
  }

  get activeRoute(): MainRoutesEnum | null {
    return this._activeRoute;
  }

  get activeSection(): SectionEnumsType | null {
    return this._activeSection;
  }

  setRoutesButtons = (routesButtons: RoutesButtonConfigType[]) => {
    this._routesButtons = routesButtons;
  };

  setSectionButtons = (sectionButtons: SectionButtonConfigType[]) => {
    this._sectionButtons = sectionButtons;
  };

  resetSectionButtons = () => {
    this._sectionButtons = null;
    this._activeSection = null;
  };

  setActiveRoute = (route: MainRoutesEnum | null) => {
    this._activeRoute = route;
  };

  setActiveSection = (section: SectionEnumsType | null) => {
    this._activeSection = section;
  };
}

export default NavbarStore;

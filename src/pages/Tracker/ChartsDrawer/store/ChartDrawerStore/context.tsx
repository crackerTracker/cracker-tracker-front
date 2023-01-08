import { useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';

import { useRootStore } from 'stores/hooks';

import ChartsDrawerStore from './ChartsDrawerStore';

export const ChartsDrawerStoreContext =
  React.createContext<ChartsDrawerStore | null>(null);

export const useChartsDrawerStore = () => {
  const chartsDrawerStore = React.useContext(ChartsDrawerStoreContext);

  if (!chartsDrawerStore) {
    throw new Error('ChartsDrawerStore not found');
  }

  return chartsDrawerStore;
};

/**
 * HOC для оборачивания компонента провайдером стора ChartsDrawerStore
 * @param WrappedComponent оборачиваемый компонент
 * (перед этим должен быть обёрнут в observer из mobx)
 */
export const withChartsDrawerStoreProvider = <T,>(
  WrappedComponent: React.ComponentType<T>
) => {
  // Записываю в отдельную переменную, чтобы не ругалось на отстуствтие DisplayName
  const WithChartsDrawerStore = (props: T) => {
    const rootStore = useRootStore();

    const chartsDrawerStore = useLocalObservable(
      () => new ChartsDrawerStore(rootStore)
    );

    return (
      <ChartsDrawerStoreContext.Provider value={chartsDrawerStore}>
        <WrappedComponent {...props} />
      </ChartsDrawerStoreContext.Provider>
    );
  };

  return WithChartsDrawerStore;
};

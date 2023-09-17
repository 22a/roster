import { useState } from 'react';
import DarkModeToggle from './components/dark-mode-toggle';
import { GameSystemMetaContext, CatalogueMetaContext } from './Context';
import GameSystemSelector from './components/game-system-selector';
import CatalogueSelector from './components/catalogue-selector';
import CatalogueDetails from './components/catalogue-details';

// TODO(@22a): think about guarding against different bs versions across schemas + repo contents
// const SUPPORTED_BATTLESCRIBE_VERSION = '2.03'

export default function App() {
  const [gameSystemMeta, setGameSystemMeta] = useState(null);
  const [catalogueMeta, setCatlogueMeta] = useState(null);
  const setGameSystemMetaAndResetCatalogueMeta = (newGameSystemMeta) => {
    setGameSystemMeta(newGameSystemMeta);
    setCatlogueMeta(null);
  };

  return (
    <GameSystemMetaContext.Provider
      value={[gameSystemMeta, setGameSystemMetaAndResetCatalogueMeta]}
    >
      <CatalogueMetaContext.Provider value={[catalogueMeta, setCatlogueMeta]}>
        <DarkModeToggle />

        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 p-8 bg-slate-200 rounded-lg flex-col space-y-6">
          <GameSystemSelector
            shouldCache={true}
            autoSelectDefault="wh40k-10e"
          />

          {gameSystemMeta && (
            <CatalogueSelector
              shouldCache={true}
              autoSelectDefault="Aeldari - Aeldari Library"
            />
          )}

          {catalogueMeta && <CatalogueDetails shouldCache={true} />}
        </div>
      </CatalogueMetaContext.Provider>
    </GameSystemMetaContext.Provider>
  );
}

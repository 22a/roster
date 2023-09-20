import { useState } from 'react';
import DarkModeToggle from './components/dark-mode-toggle';
import { GameSystemContext, CatalogueContext } from './Context';
import GameSystemSelector from './components/game-system-selector';
import CatalogueSelector from './components/catalogue-selector';
import CatalogueDetails from './components/catalogue-details';

// TODO(@22a): think about guarding against different bs versions across schemas + repo contents
// const SUPPORTED_BATTLESCRIBE_VERSION = '2.03'

export default function App() {
  const [gameSystem, setGameSystem] = useState(null);
  const [catalogue, setCatlogue] = useState(null);
  const setGameSystemAndResetCatalogue = (...args) => {
    setGameSystem(...args);
    setCatlogue(null);
  };

  return (
    <GameSystemContext.Provider
      value={[gameSystem, setGameSystemAndResetCatalogue]}
    >
      <CatalogueContext.Provider value={[catalogue, setCatlogue]}>
        <DarkModeToggle />

        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 p-8 bg-slate-200 rounded-lg flex-col space-y-6">
          <GameSystemSelector
            shouldCache={true}
            autoSelectDefault="wh40k-10e"
          />

          {gameSystem && (
            <CatalogueSelector
              shouldCache={true}
              autoSelectDefault="Aeldari - Aeldari Library"
            />
          )}
        </div>
        {catalogue && <CatalogueDetails shouldCache={true} />}
      </CatalogueContext.Provider>
    </GameSystemContext.Provider>
  );
}

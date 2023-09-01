import { createContext, useState } from 'react';
import DarkModeToggle from './components/dark-mode-toggle';
import RepositorySelector from './components/repository-selector';
import ArmySelector from './components/army-selector';

// const SUPPORTED_BATTLESCRIBE_VERSION = '2.03'

function App() {
  const [selectedRepository, setSelectedRepository] = useState(null)
  const [selectedArmy, setSelectedArmy] = useState(null);
  const setSelectedRepositoryAndResetArmy = (...args) => {
    setSelectedRepository(...args);
    setSelectedArmy(null);
  }

  return (
    <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 p-8 bg-slate-200 rounded-lg flex-col space-y-6">
      <div className='flex space-x-2'>
        <label className="w-32 block text-sm font-medium leading-6 text-gray-900">
          Dark mode:
        </label>
        <DarkModeToggle />
      </div>

      <RepositorySelector
        selectedRepository={selectedRepository}
        setSelectedRepository={setSelectedRepositoryAndResetArmy}
      />

      {selectedRepository &&
        <ArmySelector
          selectedRepository={selectedRepository}
          selectedArmy={selectedArmy}
          setSelectedArmy={setSelectedArmy}
        />
      }
    </div>
  )
}

export default App

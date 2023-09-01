import { createContext, useState } from 'react';
import RepositorySelector from './components/repository-selector';
import ArmySelector from './components/army-selector';

// const SUPPORTED_BATTLESCRIBE_VERSION = '2.03'

function App() {
  const [selectedRepository, setSelectedRepository] = useState(null)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mx-auto max-w-3xl flex-col space-y-6">
        <RepositorySelector
          selectedRepository={selectedRepository}
          setSelectedRepository={setSelectedRepository}
        />

        {selectedRepository && <ArmySelector selectedRepository={selectedRepository} />}
      </div>
    </div>
  )
}

export default App

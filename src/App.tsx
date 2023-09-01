import { createContext, useState } from 'react';
import RepositorySelector from './components/repository-selector';
import ArmySelector from './components/army-selector';

// const SUPPORTED_BATTLESCRIBE_VERSION = '2.03'

const bsDataRepositoryIndex = await (
  await fetch(
    'https://api.codetabs.com/v1/proxy/?quest=https://github.com/BSData/gallery/releases/latest/download/bsdata.catpkg-gallery.json'
  )
).json()
console.log(bsDataRepositoryIndex)

function App() {
  const [selectedRepository, setSelectedRepository] = useState(null)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mx-auto max-w-3xl flex-col space-y-4">
        <RepositorySelector
          availableRepositories={bsDataRepositoryIndex.repositories}
          selectedRepository={selectedRepository}
          setSelectedRepository={setSelectedRepository}
        />

        {selectedRepository && <ArmySelector selectedRepository={selectedRepository} />}
      </div>
    </div>
  )
}

export default App

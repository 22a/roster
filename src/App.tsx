import { createContext, useState } from 'react';
import RepositorySelector from './components/repository-selector';

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
    <div className="flex">
      <div className='flex'>
        <span>
          select a repo:
        </span>
        <div>
          <RepositorySelector availableRepositories={bsDataRepositoryIndex.repositories} selectedRepository={selectedRepository} setSelectedRepository={setSelectedRepository} />
        </div>
      </div>
      <div className=''>
        Selected repo: {selectedRepository?.description}
      </div>
    </div>
  )
}

export default App

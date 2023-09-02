import { useState, useEffect, useContext } from 'react';
import LoadingSpinner from './loading-spinner';
import Selectbox from './selectbox';
import { GameSystemContext } from '../context';

const localStorageCacheKey = 'roster:bsDataRepositoryIndex';

export default function GameSystemSelector ({shouldCache = false, autoSelectDefault = 'wh40k-10e'}) {
  const [loading, setLoading] = useState(true);
  const [indexData, setIndexData] = useState(null);
  const [gameSystem, setGameSystem] = useContext(GameSystemContext)

  useEffect(() => {
    const fetchRepositoryData = async () => {
      let bsDataRepositoryIndex;
      if (shouldCache) {
        const localStorageCache = window.localStorage.getItem(localStorageCacheKey)
        if (localStorageCache) {
          bsDataRepositoryIndex = JSON.parse(localStorageCache);
          console.log('loading bsDataRepositoryIndex from localStorage cache', bsDataRepositoryIndex)
        }
      }
      if (!bsDataRepositoryIndex) {
        bsDataRepositoryIndex = await (
          await fetch(
            'https://api.codetabs.com/v1/proxy/?quest=https://github.com/BSData/gallery/releases/latest/download/bsdata.catpkg-gallery.json'
          )
        ).json()
        if (shouldCache) {
          window.localStorage.setItem(localStorageCacheKey, JSON.stringify(bsDataRepositoryIndex))
          console.log('caching bsDataRepositoryIndex from network in localStorage', bsDataRepositoryIndex)
        } else {
          console.log('shouldCache disabled, fetched bsDataRepositoryIndex from network', bsDataRepositoryIndex)
        }
      }
      setIndexData(bsDataRepositoryIndex);
      if (autoSelectDefault) {
        const defaultSelection = bsDataRepositoryIndex.repositories.find((repo) => repo.name === autoSelectDefault)
        if (defaultSelection) {
          setGameSystem(defaultSelection);
        }
      }
      setLoading(false);
    };
    fetchRepositoryData();
  }, []);

  if (loading) {
    return ( <LoadingSpinner/> );
  }

  // TODO(@22a): in selectbox items, also show display name, version, archived warning, and potentially battlescribe version
  return (
    <div className="flex items-center space-x-2">
      <label className="w-32 block text-sm font-medium leading-6 text-gray-900">Selected game:</label>
      <Selectbox
        items={indexData?.repositories}
        selectedItem={gameSystem}
        onChange={setGameSystem}
        keyKey="name"
        labelKey="description"
        filterKeys={['name', 'description']}
      />
    </div>
  )
}

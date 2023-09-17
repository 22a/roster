import { useState, useEffect, useContext } from 'react';
import { GameSystemMetaContext, CatalogueMetaContext } from '../Context';
import LoadingSpinner from './loading-spinner';
import Selectbox from './selectbox';

const localStorageCacheKey = 'roster:gameSystem';

export default function CatalogueSelector({
  shouldCache = false,
  autoSelectDefault = 'Aeldari - Aeldari Library',
}) {
  const [gameSystemMeta] = useContext(GameSystemMetaContext);
  const [catalogueMeta, setCatalogueMeta] = useContext(CatalogueMetaContext);

  const [loading, setLoading] = useState(true);
  const [gameSystem, setGameSystem] = useState(null);

  useEffect(() => {
    if (gameSystem && gameSystem.name === gameSystem.name) {
      setLoading(false);
      return;
    }
    const fetchRepositoryData = async () => {
      setLoading(true);
      setGameSystem(null);
      let gameSystem;
      if (shouldCache) {
        const localStorageCache =
          window.localStorage.getItem(localStorageCacheKey);
        if (localStorageCache) {
          const parsedCache = JSON.parse(localStorageCache);
          if (parsedCache.repositoryUrl === gameSystemMeta.repositoryUrl) {
            gameSystem = parsedCache;
            console.log(
              'loading gameSystem from localStorage cache',
              gameSystem,
            );
          } else {
            console.log(
              'INVALIDATING CACHE: existing gameSystem localStorage cache does not match selected gameSystem',
              parsedCache.repositoryUrl,
              gameSystemMeta.repositoryUrl,
            );
          }
        }
      }
      if (!gameSystem) {
        gameSystem = await (
          await fetch(
            `https://api.codetabs.com/v1/proxy/?quest=${gameSystemMeta.repositoryUrl}`,
          )
        ).json();
        if (shouldCache) {
          window.localStorage.setItem(
            localStorageCacheKey,
            JSON.stringify(gameSystem),
          );
          console.log(
            'caching gameSystem from network in localStorage',
            gameSystem,
          );
        } else {
          console.log(
            'shouldCache disabled, fetched gameSystem from network',
            gameSystem,
          );
        }
      }
      setGameSystem(gameSystem);
      setLoading(false);
      if (autoSelectDefault) {
        const defaultSelection = gameSystem.repositoryFiles.find(
          (file) => file.name === autoSelectDefault,
        );
        if (defaultSelection) {
          setCatalogueMeta(defaultSelection);
        }
      }
    };
    fetchRepositoryData();
  }, [
    gameSystemMeta.repositoryUrl,
    gameSystemMeta.name,
    shouldCache,
    autoSelectDefault,
  ]);

  if (loading) {
    return <LoadingSpinner className="ml-40" />;
  }

  return (
    <div>
      {gameSystem && (
        <div className="ml-32 pl-2 flex space-x-2 mb-4 -mt-2">
          <a
            href={gameSystem.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="monospace underline text-blue-400"
          >
            {gameSystem.name}
          </a>
          ,<span>Last updated:</span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-400/20">
            {gameSystem.lastUpdated}
          </span>
        </div>
      )}
      {gameSystem && gameSystem.repositoryFiles && (
        <div className="flex items-center space-x-2">
          <label className="w-32 block text-sm font-medium leading-6 text-gray-900">
            Selected army:
          </label>
          <Selectbox
            items={gameSystem.repositoryFiles}
            selectedItem={catalogueMeta}
            onChange={setCatalogueMeta}
            keyKey="id"
            labelKey="name"
            filterKeys={['name']}
          />
        </div>
      )}
    </div>
  );
}

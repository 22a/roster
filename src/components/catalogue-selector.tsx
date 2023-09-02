import { useState, useEffect, useContext } from 'react';
import { GameSystemContext, CatalogueContext } from '../context';
import LoadingSpinner from './loading-spinner';
import Selectbox from './selectbox';

const localStorageCacheKey = 'roster:gameSystemRepositoryData';

export default function CatalogueSelector({
  shouldCache = false,
  autoSelectDefault = 'Aeldari - Aeldari Library',
}) {
  const [loading, setLoading] = useState(true);
  const [gameSystemRepositoryData, setGameSystemRepositoryData] =
    useState(null);
  const [gameSystem] = useContext(GameSystemContext);
  const [catalogue, setCatalogue] = useContext(CatalogueContext);

  useEffect(() => {
    if (
      gameSystemRepositoryData &&
      gameSystemRepositoryData.name === gameSystem.name
    ) {
      setLoading(false);
      return;
    }
    const fetchRepositoryData = async () => {
      setLoading(true);
      setGameSystemRepositoryData(null);
      let gameSystemRepositoryData;
      if (shouldCache) {
        const localStorageCache =
          window.localStorage.getItem(localStorageCacheKey);
        if (localStorageCache) {
          const parsedCache = JSON.parse(localStorageCache);
          if (parsedCache.repositoryUrl === gameSystem.repositoryUrl) {
            gameSystemRepositoryData = parsedCache;
            console.log(
              'loading gameSystemRepositoryData from localStorage cache',
              gameSystemRepositoryData,
            );
          } else {
            console.log(
              'INVALIDATING CACHE: existing gameSystemRepositoryData localStorage cache does not match selected gameSystem',
              parsedCache.repositoryUrl,
              gameSystem.repositoryUrl,
            );
          }
        }
      }
      if (!gameSystemRepositoryData) {
        gameSystemRepositoryData = await (
          await fetch(
            `https://api.codetabs.com/v1/proxy/?quest=${gameSystem.repositoryUrl}`,
          )
        ).json();
        if (shouldCache) {
          window.localStorage.setItem(
            localStorageCacheKey,
            JSON.stringify(gameSystemRepositoryData),
          );
          console.log(
            'caching gameSystemRepositoryData from network in localStorage',
            gameSystemRepositoryData,
          );
        } else {
          console.log(
            'shouldCache disabled, fetched gameSystemRepositoryData from network',
            gameSystemRepositoryData,
          );
        }
      }
      setGameSystemRepositoryData(gameSystemRepositoryData);
      setLoading(false);
      if (autoSelectDefault) {
        const defaultSelection = gameSystemRepositoryData.repositoryFiles.find(
          (file) => file.name === autoSelectDefault,
        );
        if (defaultSelection) {
          setCatalogue(defaultSelection);
        }
      }
    };
    fetchRepositoryData();
  }, [
    gameSystem.repositoryUrl,
    gameSystem.name,
    shouldCache,
    autoSelectDefault,
  ]);

  if (loading) {
    return <LoadingSpinner className="ml-40" />;
  }

  return (
    <div>
      {gameSystemRepositoryData && (
        <div className="ml-32 pl-2 flex space-x-2 mb-4 -mt-2">
          <a
            href={gameSystemRepositoryData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="monospace underline text-blue-400"
          >
            {gameSystemRepositoryData.name}
          </a>
          ,<span>Last updated:</span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-400/20">
            {gameSystemRepositoryData.lastUpdated}
          </span>
        </div>
      )}
      {gameSystemRepositoryData && gameSystemRepositoryData.repositoryFiles && (
        <div className="flex items-center space-x-2">
          <label className="w-32 block text-sm font-medium leading-6 text-gray-900">
            Selected army:
          </label>
          <Selectbox
            items={gameSystemRepositoryData.repositoryFiles}
            selectedItem={catalogue}
            onChange={setCatalogue}
            keyKey="id"
            labelKey="name"
            filterKeys={['name']}
          />
        </div>
      )}
    </div>
  );
}

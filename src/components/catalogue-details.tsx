import { useState, useEffect, useContext } from 'react';
import { CatalogueContext } from '../Context';
import LoadingSpinner from './loading-spinner';
import { parseXML } from '../lib/schema-adapter';

const localStorageCacheKey = 'roster:catalogueData';

export default function CatalogueDetails({ shouldCache = false }) {
  const [loading, setLoading] = useState(true);
  const [catalogueData, setCatalogueData] = useState(null);
  const [catalogue] = useContext(CatalogueContext);

  useEffect(() => {
    const fetchArmyData = async () => {
      setLoading(true);
      setCatalogueData(null);
      let catData;
      if (shouldCache) {
        const localStorageCache =
          window.localStorage.getItem(localStorageCacheKey);
        if (localStorageCache) {
          const parsedCache = JSON.parse(localStorageCache);
          if (parsedCache.id === catalogue.id) {
            catData = parsedCache;
            console.log('loading catData from localStorage cache', catData);
          } else {
            console.log(
              'INVALIDATING CACHE: existing catData localStorage cache does not match selected gameSystem',
              parsedCache.id,
              catalogue.id,
            );
          }
        }
        if (
          localStorageCache &&
          localStorageCache.githubUrl === catalogue.githubUrl
        ) {
          catData = JSON.parse(localStorageCache);
          console.log('loading catData from localStorage cache', catData);
        }
      }
      if (!catData) {
        const catalogueRawUrl = catalogue.githubUrl
          .replace('https://github.com', 'https://raw.githubusercontent.com')
          .replace('/blob/', '/');
        const xmlCatalogueData = await (await fetch(catalogueRawUrl)).text();
        catData = parseXML(xmlCatalogueData);
        if (shouldCache) {
          window.localStorage.setItem(
            localStorageCacheKey,
            JSON.stringify(catData),
          );
          console.log('caching catData from network in localStorage', catData);
        } else {
          console.log(
            'shouldCache disabled, fetched catData from network',
            catData,
          );
        }
      }
      setCatalogueData(catData);
      setLoading(false);
    };
    fetchArmyData();
  }, [catalogue.id, catalogue.githubUrl, shouldCache]);

  if (loading) {
    return <LoadingSpinner className="ml-40" />;
  }

  return (
    <div>
      {catalogueData && (
        <div className="ml-32 pl-2 flex space-x-2 mb-4 -mt-2">
          <span>id:</span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-400/20">
            {catalogueData.id}
          </span>
          <span>(we console.logged the cat, boyo)</span>
        </div>
      )}
    </div>
  );
}

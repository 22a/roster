import { useState, useEffect, useContext } from 'react';
import { CatalogueMetaContext } from '../Context';
import LoadingSpinner from './loading-spinner';
import { parseXML } from '../lib/schema-adapter';

const localStorageCacheKey = 'roster:catalogue';

export default function CatalogueDetails({ shouldCache = false }) {
  const [loading, setLoading] = useState(true);
  const [catalogue, setCatalogue] = useState(null);
  const [catalogueMeta] = useContext(CatalogueMetaContext);

  useEffect(() => {
    const fetchArmyData = async () => {
      setLoading(true);
      setCatalogue(null);
      let catData;
      if (shouldCache) {
        const localStorageCache =
          window.localStorage.getItem(localStorageCacheKey);
        if (localStorageCache) {
          const parsedCache = JSON.parse(localStorageCache);
          if (parsedCache.id === catalogueMeta.id) {
            catData = parsedCache;
            console.log('loading catData from localStorage cache', catData);
          } else {
            console.log(
              'INVALIDATING CACHE: existing catData localStorage cache does not match selected gameSystem',
              parsedCache.id,
              catalogueMeta.id,
            );
          }
        }
        if (
          localStorageCache &&
          localStorageCache.githubUrl === catalogueMeta.githubUrl
        ) {
          catData = JSON.parse(localStorageCache);
          console.log('loading catData from localStorage cache', catData);
        }
      }
      if (!catData) {
        const catalogueRawUrl = catalogueMeta.githubUrl
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
      setCatalogue(catData);
      setLoading(false);
    };
    fetchArmyData();
  }, [catalogueMeta.id, catalogueMeta.githubUrl, shouldCache]);

  if (loading) {
    return <LoadingSpinner className="ml-40" />;
  }

  return (
    <div>
      {catalogue && (
        <div className="ml-32 pl-2 flex space-x-2 mb-4 -mt-2">
          <span>id:</span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-400/20">
            {catalogue.id}
          </span>
          <span>(we console.logged the cat, boyo)</span>
        </div>
      )}
    </div>
  );
}

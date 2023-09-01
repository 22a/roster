import { useState, useEffect } from 'react';
import LoadingSpinner from './loading-spinner';
import Selectbox from './selectbox';

export default function RepositorySelector ({selectedRepository, setSelectedRepository}) {
  const [loading, setLoading] = useState(true);
  const [indexData, setIndexData] = useState(null);

  useEffect(() => {
    const fetchRepositoryData = async () => {
      const bsDataRepositoryIndex = await (
        await fetch(
          'https://api.codetabs.com/v1/proxy/?quest=https://github.com/BSData/gallery/releases/latest/download/bsdata.catpkg-gallery.json'
        )
      ).json()
      console.log(bsDataRepositoryIndex)
      setIndexData(bsDataRepositoryIndex);
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
        selectedItem={selectedRepository}
        onChange={setSelectedRepository}
        keyKey="name"
        labelKey="description"
        filterKeys={['name', 'description']}
      />
    </div>
  )
}

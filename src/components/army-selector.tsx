import { useState, useEffect } from 'react';
import LoadingSpinner from './loading-spinner';
import Selectbox from './selectbox';

export default function ArmySelector ({selectedRepository, selectedArmy, setSelectedArmy}) {
  const [loading, setLoading] = useState(true);
  const [repositoryData, setRepositoryData] = useState(null);

  useEffect(() => {
    if (repositoryData && repositoryData.name === selectedRepository.name) {
      setLoading(false);
      return
    }
    const fetchRepositoryData = async () => {
      setLoading(true);
      setRepositoryData(null);
      const repositoryData = await (await fetch(`https://api.codetabs.com/v1/proxy/?quest=${selectedRepository.repositoryUrl}`)).json()
      console.log(repositoryData)
      setRepositoryData(repositoryData);
      setLoading(false);
    };
    fetchRepositoryData();
  }, [selectedRepository.repositoryUrl]);

  return (
    <div>
      {loading && <LoadingSpinner className="ml-40"/>}
      {repositoryData && (
        <div className="ml-32 pl-2 flex space-x-2 mb-4 -mt-2">
          <a href={repositoryData.githubUrl} target="_blank" rel="noreferrer" className="monospace underline text-blue-400">
            {repositoryData.name}
          </a>,
          <span>
            Last updated:
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-400/20">
            {repositoryData.lastUpdated}
          </span>
        </div>
      )}
      {repositoryData && repositoryData.repositoryFiles && (
        <div className='flex items-center space-x-2'>
          <label className="w-32 block text-sm font-medium leading-6 text-gray-900">Selected army:</label>
          <Selectbox
            items={repositoryData.repositoryFiles}
            selectedItem={selectedArmy}
            onChange={setSelectedArmy}
            keyKey="id"
            labelKey="name"
            filterKeys={['name']}
          />
        </div>
      )}
    </div>
  )
}

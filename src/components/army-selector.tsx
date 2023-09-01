import { useState, useEffect } from 'react';
import LoadingSpinner from './loading-spinner';

export default function ArmySelector ({selectedRepository}) {
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
      {loading && <LoadingSpinner/>}
      {repositoryData && ['description', 'name', 'githubUrl', 'lastUpdated'].map((key) =>
        (<div key={key}><strong>{key}:</strong> {repositoryData[key]}</div>)
      )}
    </div>
  )
}

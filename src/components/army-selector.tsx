import { useState, useEffect } from 'react';

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
      {loading && <div>
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>}
      {repositoryData && ['description', 'name', 'githubUrl', 'lastUpdated'].map((key) =>
        (<div key={key}><strong>{key}:</strong> {repositoryData[key]}</div>)
      )}
    </div>
  )
}

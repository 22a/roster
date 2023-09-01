import { useState, useEffect } from 'react';
import LoadingSpinner from './loading-spinner';
import { parseXML } from '../lib/schema-adapter'

export default function ArmyDetails ({selectedArmy}) {
  const [loading, setLoading] = useState(true);
  const [armyData, setArmyData] = useState(null);

  useEffect(() => {
    const fetchArmyData = async () => {
      setLoading(true);
      setArmyData(null);
      const armyCatlogueUrl = selectedArmy.githubUrl
      .replace('https://github.com', 'https://raw.githubusercontent.com')
      .replace('/blob/', '/')
      const armyCat = await (await fetch(armyCatlogueUrl)).text()
      const parsedCat = parseXML(armyCat);
      console.log(parsedCat)
      setArmyData(parsedCat);
      setLoading(false);
    };
    fetchArmyData();
  }, [selectedArmy.githubUrl]);

  if (loading) {
    return (<LoadingSpinner className="ml-40"/>)
  }

  return (
    <div>
      {armyData && (
        <div className="ml-32 pl-2 flex space-x-2 mb-4 -mt-2">
          <span>
            id:
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-400/20">
            {armyData.id}
          </span>
          <span>
            (we console.logged the cat, boyo):
          </span>
        </div>
      )}
    </div>
  )
}

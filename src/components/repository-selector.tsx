import { useState } from 'react';
import { Combobox } from '@headlessui/react'

export default function RepositorySelector ({availableRepositories, selectedRepository, setSelectedRepository}) {
  const [repositoryQuery, setRepositoryQuery] = useState('')

  const filteredRepositories =
    repositoryQuery === ''
      ? availableRepositories
      : availableRepositories.filter((repository) => {
        return repository.description.toLowerCase().includes(repositoryQuery.toLowerCase())
      })

  return (
    <>
      <Combobox value={selectedRepository} onChange={setSelectedRepository} nullable>
        <Combobox.Input onChange={(event) => setRepositoryQuery(event.target.value)} displayValue={(repository) => repository?.description} />
        <Combobox.Options>
          {filteredRepositories.map((repository) => (
            <Combobox.Option key={repository.name} value={repository}>
              {repository.description}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </>
  )
}

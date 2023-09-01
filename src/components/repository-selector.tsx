import { useState } from 'react';
import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RepositorySelector ({availableRepositories, selectedRepository, setSelectedRepository}) {
  const [repositoryQuery, setRepositoryQuery] = useState('')

  // TODO(@22a): account for .name as well, and be forgiving of spaces in both directions
  const filteredRepositories =
    repositoryQuery === ''
      ? availableRepositories
      : availableRepositories.filter((repository) => {
        return repository.description.toLowerCase().includes(repositoryQuery.toLowerCase())
      })

  const clearFilterThenSelectRepository = (...args) => {
    setRepositoryQuery('');
    setSelectedRepository(...args);
  }

  // TODO(@22a): display name, version, archived warning, and potentially battlescribe version
  return (
    <Combobox as="div" value={selectedRepository} onChange={clearFilterThenSelectRepository}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Selected GameSystem repository:</Combobox.Label>

      <div className="relative mt-2">
        <Combobox.Button className="flex items-center rounded-r-md focus:outline-none relative">
          <Combobox.Input
            className="w-96 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setRepositoryQuery(event.target.value)}
            displayValue={(repository) => repository?.description}
          />
          <ChevronUpDownIcon className="absolute right-0 h-5 w-5 mx-2 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredRepositories.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredRepositories.map((repository) => (
              <Combobox.Option
                key={repository.name}
                value={repository}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{repository.description}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

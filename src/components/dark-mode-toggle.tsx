import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import nightwind from "nightwind/helper"

nightwind.initNightwind();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(localStorage.getItem('nightwind-mode') === 'dark');

  useEffect(() => {
    if (enabled) {
      nightwind.enable(true)
    } else {
      nightwind.enable(false)
    }
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-slate-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Set dark mode</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          ☀️
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          🌑
        </span>
      </span>
    </Switch>
  )
}

import React from 'react'

const Ad = ({provider} : {provider: string}) => {
  return (
    <div className="flex flex-wrap bg-gray-100 dark:bg-gray-700 p-3">
      <div className="h-24 w-full bg-gray-200 dark:bg-gray-600"></div>
      <div className="ml-auto -mb-3 -mr-3 text-sm">
        Ad provided by {provider}
      </div>
    </div>
  )
}

export default Ad
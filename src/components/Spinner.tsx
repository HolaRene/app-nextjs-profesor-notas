// components/Spinner.tsx
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center'>
      <ArrowPathIcon className='h-8 w-8 animate-spin text-gray-900' />
    </div>
  )
}

export default Spinner

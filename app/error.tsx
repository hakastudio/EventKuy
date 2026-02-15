'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-gray-500 mb-6 text-sm">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>
        <div className="flex gap-3 justify-center">
            <button
            onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
            Try again
            </button>
            <a
                href="/"
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
                Back Home
            </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
             <div className="mt-8 text-left bg-gray-900 text-red-400 p-4 rounded-lg overflow-auto text-xs font-mono max-h-40">
                 {error.message}
             </div>
        )}
      </div>
    </div>
  )
}

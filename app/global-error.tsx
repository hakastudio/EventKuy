'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h2 className="text-3xl font-bold mb-4">Critical Error!</h2>
            <p className="mb-8 text-gray-400">Something went wrong globally.</p>
            <button 
                onClick={() => reset()}
                className="bg-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-700"
            >
                Try again
            </button>
        </div>
      </body>
    </html>
  )
}

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handlePredict() {
    const x = parseFloat(value)
    if (Number.isNaN(x)) {
      setError('Please enter a valid number.')
      setResult(null)
      return
    }
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x }),
      })
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      setResult(data.prediction ?? data.predicted_value ?? data)
    } catch (err) {
      const msg = err.message || 'Request failed.'
      const friendly = msg === 'Failed to fetch'
        ? `Could not reach the API at ${API_BASE}. Is the backend running? (e.g. uvicorn api:app --reload --port 8000)`
        : msg
      setError(friendly)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Linear Regression Predict</CardTitle>
          <CardDescription>
            Enter a value and call the FastAPI /predict endpoint.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            placeholder="Enter x (e.g. 2.5)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
          />
          {result !== null && (
            <p className="text-sm text-muted-foreground">
              Prediction: <span className="font-medium text-foreground">{result}</span>
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handlePredict} disabled={loading} className="w-full">
            {loading ? 'Predicting…' : 'Predict'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App

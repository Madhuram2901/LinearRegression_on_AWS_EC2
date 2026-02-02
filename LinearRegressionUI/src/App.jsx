import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// 🔴 IMPORTANT: No HTTP fallback in production
const API_BASE = import.meta.env.VITE_API_URL

if (!API_BASE) {
  throw new Error('VITE_API_URL is not defined. Please set it in Render environment variables.')
}

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

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const data = await response.json()
      setResult(data.prediction)
    } catch (err) {
      setError('Prediction failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Linear Regression Predictor</CardTitle>
          <CardDescription>
            Enter a value and get a prediction from the deployed FastAPI model.
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
            <p className="text-sm">
              Prediction:{' '}
              <span className="font-semibold text-foreground">
                {result}
              </span>
            </p>
          )}

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
        </CardContent>

        <CardFooter>
          <Button
            onClick={handlePredict}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Predicting…' : 'Predict'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App

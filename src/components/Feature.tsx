'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function FeatureSection() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      
      const data = await response.json()
      console.log('Generated response:', data)
      
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#7C3AED]">
      <div className="container px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Generate your first app today
            </h2>
            <p className="text-xl text-white/80">
              Turn your ideas into a <span className="text-white">functional react app</span>
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-2xl">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A weather widget with animated icons"
                className="min-h-[100px] w-full resize-none rounded-xl bg-white/10 p-4 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/20"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="bg-white/20 text-white hover:bg-white/30 px-6"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


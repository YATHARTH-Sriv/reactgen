'use client'

import { useState, FormEvent } from 'react'
import { Paperclip, ArrowUp, Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signOut } from 'next-auth/react'
import { IoIosLogOut } from "react-icons/io"

const componentSuggestions = [
  "Create a responsive navigation bar",
  "Build a modal dialog component",
  "Generate a form with validation",
]

// Template data with code examples and preview images
const componentTemplates = [
  {
    id: 1,
    title: "Navbar and Hero",
    description: "A responsive navigation bar and hero section",
    icon: "📐",
    code: `"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
    return (
        <nav className="px-4 py-8 flex justify-between bg-black text-white">
            <div>
                <Link href="/" className="text-2xl font-bold">AWS</Link>
            </div>
            <ul className="flex gap-8 text-lg">
                <li>
                    <Link href="/pricing">
                        <p className="hover:text-blue-500">Pricing</p>
                    </Link>
                </li>
                <li>
                    <Link href="/docs">
                        <p className="hover:text-blue-500">Docs</p>
                    </Link>
                </li>
            </ul>
            <div>
                <Link href="/login">
                    <Button variant="secondary">Login</Button>
                </Link>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section className="mx-auto px-4 py-8 md:px-6 lg:py-12 text-center">
            <div className="max-w-2xl mx-auto">
                <p className="text-4xl md:text-6xl font-bold">
                    Build Your APP <br />
                    On AWS Cloud
                </p>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                    pharetra sagittis consectetur. Sed eget nunc in massa commodo
                    pharetra id et velit. Integer hendrerit ut ante quis placerat.
                </p>
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <Hero />
        </div>
    );
}`,
    previewUrl: "./nav.png"
  },
  {
    id: 2,
    title: "Login",
    description: " A basic login form with validation and error handling",
    icon: "🎨",
    code: `"use client"
import { useState, FormEvent } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link  from "next/link"
import { message } from "antd"
import { Card } from "@/components/ui/card"

const ValidationForm = () => {
  const handleValidation = (e: FormEvent) => {
    e.preventDefault()
    if (formData.email !== "" && formData.password !== "") {
      if (formData.email === "demo@demo.com" && formData.password === "demo123") {
        message.success("Logged in successfully")
      } else {
        message.error("Incorrect email or password")
      }
    } else {
      message.error("Please fill in all the fields")
    }
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
   <main className="bg-dark h-screen flex items-center justify-center">
      <Card className="p-5 w-[100vh] shadow">
        <h1 className="text-center mb-3 text-2xl">Login</h1>
        <form onSubmit={handleValidation}>
          <p className="mb-3">
            <Input name="email" type="email" onChange={handleChange} placeholder="johndoe@example.com" />
          </p>
          <p  className="mb-3">
            <Input name="password" type="password" onChange={handleChange} placeholder="Enter password" />
          </p>
          <div className="flex items-center justify-between mb-3">
            <Link href="/forgot-password">
              <p className="text-white">Forgot password?</p>
            </Link>
            <Button variant={"secondary"} type="submit">
              Login
            </Button>
          </div>
          <p className="text-white text-center">
            Don't have an account?{" "}
            <Link href="/register">
              <p className="text-primary underline ml-1">Register</p>
            </Link>
          </p>
        </form>
      </Card>
    </main>
  )
}

export default ValidationForm`,
    previewUrl: "./Login.png"
  },
  {
    id: 3,
    title: "Pricing Components",
    description: "A basic pricing component for your landing page",
    icon: "📝",
    code: `// Pricing Component Example
const FormInput = ({ label, type = 'text', error }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        className={\`w-full px-3 py-2 border rounded-md \${
          error ? 'border-red-500' : 'border-gray-300'
        }\`}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};`,
    previewUrl: "./Pricing.png"
  },
]


interface Template {
  id: number
  title: string
  description: string
  icon: string
  code: string
  previewUrl: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface CodeResponse {
  code: string
  dependencies: string[]
}


const CodeDisplay = ({ code, dependencies }: CodeResponse) => {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Split code into files based on the actual file content structure
  const files = code.split(/(?=(?:\/\*\*|\/\/)\s*[\w.]+\.(?:jsx?|tsx?))/)
    .filter(Boolean)
    .reduce((acc: Record<string, string>, section: string) => {
      // Extract filename from comments like "// filename.jsx" or "/** filename.jsx */"
      const filenameMatch = section.match(/(?:\/\*\*|\/\/)\s*([\w.]+\.(?:jsx?|tsx?))/);
      if (filenameMatch) {
        const filename = filenameMatch[1];
        // Remove the filename comment from the code
        const code = section.replace(/(?:\/\*\*|\/\/)\s*[\w.]+\.(?:jsx?|tsx?)\s*\*?\*\/?\s*/, '').trim();
        acc[filename] = code;
      } else {
        // If no filename found, use a default name
        acc['Component.jsx'] = section.trim();
      }
      return acc;
    }, {});

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Generated Components</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy All
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(files).length > 1 ? (
          <Tabs defaultValue={Object.keys(files)[0]} className="w-full">
            <TabsList className="w-full">
              {Object.keys(files).map((filename) => (
                <TabsTrigger key={filename} value={filename} className="flex-1">
                  {filename}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(files).map(([filename, content]) => (
              <TabsContent key={filename} value={filename}>
                <div className="relative rounded-lg border bg-muted/50 backdrop-blur">
                  <div className="flex justify-between items-center px-4 py-2 border-b">
                    <span className="text-sm font-medium">{filename}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-foreground">{content}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="relative rounded-lg border bg-muted/50 backdrop-blur">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <span className="text-sm font-medium">
                {Object.keys(files)[0] || 'Component.jsx'}
              </span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-foreground">
                {Object.values(files)[0] || code}
              </code>
            </pre>
          </div>
        )}

        {dependencies.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold">Required Dependencies:</h4>
            <ul className="space-y-1">
              {dependencies.map((dep) => (
                <li 
                  key={dep} 
                  className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-md"
                >
                  {dep}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


const TemplateCard = ({ template }: { template: Template }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{template.icon}</span>
            <CardTitle>{template.title}</CardTitle>
          </div>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{template.title}</DialogTitle>
            <DialogDescription>{template.description}</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 flex-1 min-h-0">
            <div className="rounded-lg overflow-hidden">
              <img
                src={template.previewUrl}
                alt={`Preview of ${template.title}`}
                className="w-full object-cover"
              />
            </div>
            
            <div className="bg-muted rounded-lg flex-1 min-h-0 flex flex-col">
              <pre className="text-sm p-4 overflow-y-auto max-h-[400px] flex-1">
                <code>{template.code}</code>
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function Dashboard() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<CodeResponse | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate code')
      }

      const data = await response.json()
      setGeneratedCode(data)
    } catch (error) {
      console.error('Error generating code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <main className="flex-1 overflow-auto p-4">
        {!generatedCode ? (
          <>
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
              <h1 className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent text-center">
                What component can I help you create?
              </h1>
              <div className="flex flex-wrap justify-center gap-2">
                {componentSuggestions.map((suggestion) => (
                  <Button 
                    key={suggestion} 
                    variant="outline" 
                    size="sm"
                    className="border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-5xl space-y-12 mt-12">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">Component Templates</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {componentTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <CodeDisplay {...generatedCode} />
          </div>
        )}
      </main>

      <div className="border-t border-border bg-background/80 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-2">
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the component you want to create... Add as much detail as you can! Like Margins and Paddings, Colors, etc."
            className="min-h-[100px] bg-card/50"
          />
          <div className="flex justify-end gap-2">
            {/* <Button 
              type="button"
              size="icon"
              variant="ghost" 
            >
              <Paperclip className="h-4 w-4" />
            </Button> */}
            <Button type="submit" disabled={isLoading}>
              <ArrowUp className="mr-2 h-4 w-4" />
              {isLoading ? 'Generating...' : 'Generate Component'}
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  )
}
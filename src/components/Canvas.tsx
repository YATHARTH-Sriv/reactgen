"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';

export function Canvas() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateCode = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      const res = await axios.post("/api/gen", { prompt });
      if (res.status === 200) {
        console.log("Generated code:", res.data);
        setGeneratedCode(res.data);
      } else {
        alert("Failed to generate code. Please try again.");
      }
    } catch (error) {
      console.error("Error while generating code:", error);
      alert("An error occurred while generating code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6 bg-gray-900 min-h-screen">
      <Card className="bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">User Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe the UI component you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] bg-gray-900 border-gray-800 text-white placeholder:text-gray-400"
          />
          <Button 
            className={cn(
              "mt-4 bg-blue-600 hover:bg-blue-700 text-white",
              isGenerating && "opacity-70 cursor-not-allowed"
            )} 
            onClick={handleGenerateCode}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate UI'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-950 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Generated Code</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="hover:bg-gray-800 border-gray-700 gap-2"
            disabled={!generatedCode}
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-gray-300" />
                Copy
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-800 rounded-md overflow-auto max-h-[600px]">
            <Editor
              value={generatedCode}
              onValueChange={code => setGeneratedCode(code)}
              highlight={code => highlight(code, languages.jsx, 'jsx')}
              padding={16}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: '#111827',
                minHeight: '400px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
              className="text-gray-300"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

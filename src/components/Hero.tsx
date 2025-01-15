"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { FaHeart } from "react-icons/fa6";
import { Input } from "./ui/input";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Check } from "lucide-react";

export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("Generated response:", data);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 min-h-screen flex flex-col bg-gradient-to-b from-[#16171c] to-[#262243] items-center justify-center">
        <div className="container flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm">
            <span className="mr-2 flex gap-2 text-white">
              Built with <FaHeart className="text-lg text-red-500" />
            </span>
            <div className="flex items-center gap-1">
              <span className="text-white">By A React Dev</span>
            </div>
          </div>

          <div className="relative max-w-4xl space-y-4">
            <h1 className="text-4xl text-white gap-y-2 font-light tracking-tight sm:text-6xl">
              Build React Apps 10x
              <br />
              Faster with AI
            </h1>
            <p className="text-xl text-muted-foreground">
              In this new gen of AI, ReactGen is here to help you build React apps faster than ever.
            </p>
          </div>

          <Button size="lg" className="bg-[#7C3AED] hover:bg-[#7C3AED]/90">
            Get Started Free
          </Button>
        </div>

        <section className="relative overflow-hidden rounded-3xl bg-[#7C3AED] mt-16 w-full max-w-4xl">
          <div className="px-8 py-16">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl font-light tracking-tight text-white">
                Generate your first app today
              </h2>
              <p className="text-xl text-black">
                Turn your ideas into a <span className="text-black">functional React app</span>
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A weather widget with animated icons"
                className="text-black w-80 relative"
              />
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="bg-black h-10 w-fit text-white hover:text-black hover:bg-white"
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </section>
      </section>

      {/* New gradient transition section */}
      <div className="relative bg-gradient-to-b from-[#262243] to-black">
        <div className="absolute inset-0 bg-gradient-to-b from-[#262243] via-[#262243] to-black" />
        <div className="container relative z-10 px-4">
          <div className="w-full flex justify-center pt-20">
            <div className="w-full md:w-4/5 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#262243] to-transparent h-1/3 pointer-events-none" />
              <Image
                src="https://www.tempolabs.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelop-section-image.0debbbc7.webp&w=3840&q=75"
                alt="stats dash image"
                width={1200}
                height={800}
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


const PricingSection = () => {
  return (
    <section className="py-16 bg-[#1C1C1F]">
      <div className="container px-4 md:px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-16">
          Plans & Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <Card className="bg-[#27262b] border-0 text-white hover:bg-[#2F2E33] transition-colors">
            <CardHeader className="pb-8">
              <div className="px-2">
                <div className="inline-block text-sm font-medium bg-white/10 rounded-md px-3 py-1">
                  Free
                </div>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-6xl font-bold">$0</span>
                <span className="ml-2 text-xl text-gray-400">/ month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-white shrink-0 mt-1" />
                  <span>
                    Full access to <span className="text-white font-medium">GPT-4o</span> or{" "}
                    <span className="text-white font-medium">Claude 3.5 Sonnet</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-white shrink-0 mt-1" />
                  <span>
                    <span className="text-white font-medium">500k</span> free daily tokens
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-white shrink-0 mt-1" />
                  <span>
                    <span className="text-white font-medium">10M</span> free monthly tokens
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="bg-[#27262b] border-0 text-white hover:bg-[#2F2E33] transition-colors">
            <CardHeader className="pb-8">
              <div className="px-2">
                <div className="inline-block text-sm font-medium bg-white/10 rounded-md px-3 py-1">
                  Pro
                </div>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-6xl font-bold">$30-$350</span>
                <span className="ml-2 text-xl text-gray-400">/ month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-white font-medium">Everything in free, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#7C3AED] shrink-0 mt-1" />
                  <span className="text-white font-medium">No daily limits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#7C3AED] shrink-0 mt-1" />
                  <span>
                    <span className="text-white font-medium">15M, 30M, 65M or unlimited</span> monthly tokens
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Agent+ Tier */}
          <Card className="bg-[#27262b] border-0 text-white hover:bg-[#2F2E33] transition-colors">
            <CardHeader className="pb-8">
              <div className="px-2">
                <div className="inline-block text-sm font-medium bg-white/10 rounded-md px-3 py-1">
                  Agent+
                </div>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-6xl font-bold">$4,000</span>
                <span className="ml-2 text-xl text-gray-400">/ month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#10B981] shrink-0 mt-1" />
                  <span>
                    Our agents design and build{" "}
                    <span className="text-white font-medium">1-3 features</span> for you{" "}
                    <span className="text-white font-medium">per week</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#10B981] shrink-0 mt-1" />
                  <span>
                    Quality guaranteed by{" "}
                    <span className="text-white font-medium">Human Engineers and Designers</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#10B981] shrink-0 mt-1" />
                  <span>
                    <span className="text-white font-medium">48-72hr</span> turnaround time
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#10B981] shrink-0 mt-1" />
                  <span>
                    <span className="text-white font-medium">Unlimited design revisions</span> and code review improvements
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
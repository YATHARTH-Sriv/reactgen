"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { FaHeart } from "react-icons/fa6";
import { Input } from "./ui/input";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    router.push("/newdash");
  };

  return (
    <>
      <section className="pt-32 pb-20 min-h-screen flex flex-col bg-gradient-to-b from-[#16171c] to-[#262243] items-center justify-center px-4 sm:px-8">
        <div className="container mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm">
            <span className="mr-2 flex gap-2 text-white">
              Built with <FaHeart className="text-lg text-red-500" />
            </span>
            <div className="flex items-center gap-1">
              <span className="text-white">By A React Dev</span>
            </div>
          </div>

          <div className="relative max-w-4xl space-y-4 mx-auto px-2">
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-white gap-y-2 font-light tracking-tight">
              Build React Apps 10x
              <br />
              Faster with AI
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground">
              In this new gen of AI, ReactGen is here to help you build React apps faster than ever.
            </p>
          </div>

          <Link href="/newdash">
            <Button size="lg" className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#7C3AED]/90">
              Get Started Free
            </Button>
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-3xl bg-[#7C3AED] mt-16 w-full max-w-4xl mx-auto px-4 sm:px-8">
          <div className="py-16">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
                Generate your first component today
              </h2>
              <p className="text-base sm:text-xl text-black">
                Turn your ideas into a <span className="text-black">functional React components</span>
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A weather widget with animated icons"
                className="text-black w-full sm:w-80 relative"
              />
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="bg-black h-10 w-full sm:w-auto text-white hover:text-black hover:bg-white"
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </section>
      </section>

      <div className="relative bg-gradient-to-b from-[#262243] to-black">
        <div className="absolute inset-0 bg-gradient-to-b from-[#262243] via-[#262243] to-black" />
        <div className="container relative z-10 px-4 sm:px-8 mx-auto">
          <div className="w-full flex justify-center pt-20">
            <div className="w-full md:w-4/5 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#262243] to-transparent h-1/3 pointer-events-none" />
              <Image
                src="/dash.png"
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

export const PricingSection = () => {
  return (
    <section className="py-16 bg-[#1C1C1F] px-4 sm:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-16">
          Plans & Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
};

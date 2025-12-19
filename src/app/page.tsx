"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import Logo from "@/components/logo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  const image = placeholderImages.find((p) => p.id === "get-started-sapling");

  return (
    <div className="relative flex flex-col min-h-screen">
      {image && (
        <Image
          src={image.imageUrl}
          alt={image.description}
          data-ai-hint={image.imageHint}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 text-white">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <p className="text-center text-xl font-medium text-slate-300 mb-4">
            Rewiring wealth thinking
          </p>
          <p className="mb-8 text-slate-300">
            Welcome to PsycheMoney! Take control of your finances and build a
            brighter financial future.
          </p>
          <Button asChild className="w-full max-w-xs" variant="secondary">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

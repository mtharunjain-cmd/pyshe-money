"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import Logo from "@/components/logo";
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
      <div className="absolute inset-0 bg-black/60" />
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 text-white">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="flex flex-col items-center gap-4 mb-4">
            <Logo className="text-yellow-400" />
            <span className="font-headline text-3xl font-bold tracking-wider text-white">
              PSYCHEMONEY
            </span>
          </div>
          <p className="text-center text-lg font-medium text-slate-300 mb-6">
            Rewiring Wealth Thinking
          </p>
          <Button asChild style={{ backgroundColor: '#FBBF24', color: '#1E293B' }} className="hover:bg-yellow-400">
            <Link href="/dashboard">
              Get Started
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

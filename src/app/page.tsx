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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          {image && (
            <div className="relative h-64 w-64 mb-8">
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <p className="text-center text-xl font-medium text-muted-foreground mb-4">
            Rewiring wealth thinking
          </p>
          <p className="mb-8 text-muted-foreground">
            Welcome to PsycheMoney! Take control of your finances and build a
            brighter financial future.
          </p>
          <Button asChild className="w-full max-w-xs">
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

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import Logo from "./logo";
import { ArrowRight } from "lucide-react";

type GetStartedModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function GetStartedModal({
  isOpen,
  onOpenChange,
}: GetStartedModalProps) {
  const image = placeholderImages.find((p) => p.id === "get-started-sapling");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0">
        {image && (
          <div className="relative h-48 w-full">
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        )}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle asChild>
            <div className="flex justify-center">
              <Logo />
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-lg font-medium text-muted-foreground pt-2">
            Rewiring wealth thinking
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-0 text-center text-sm text-muted-foreground">
          Welcome to PsycheMoney! Take control of your finances and build a
          brighter financial future.
        </div>
        <DialogFooter className="p-6 pt-0">
          <Button
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

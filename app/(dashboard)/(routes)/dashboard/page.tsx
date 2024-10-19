"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
    href: "/conversation",
  },

  {
    label: "Music Generator",
    icon: Music,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    href: "/music",
  },

  {
    label: "Image Generator",
    icon: ImageIcon,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    href: "/image",
  },

  {
    label: "Video Generator",
    icon: VideoIcon,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    href: "/video",
  },

  {
    label: "Code Generator",
    icon: Code,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    href: "/code",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-3xl font-bold md:text-4xl text-center">
          Explore AI ToolKit
        </h2>
        <p className="text-muted=foreground text-center font-light text-sm md:text-lg ">
          Now that how AI makes things simpler
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p2 w-fit rounded-md , tool.bgColor")}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

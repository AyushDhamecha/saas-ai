"use client"

import { useEffect, useState } from "react";
import {Card,CardContent} from "@/components/ui/card"
import { MAX_FREE_COUNTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

import { Progress } from "./ui/progress";
import { Zap } from "lucide-react";
import { useProModal } from "@/app/hooks/use-pro-modal";



interface FreeCounterProps{
    apiLimitCount:number;
}



export const FreeCounter=({
    apiLimitCount=0
}:FreeCounterProps)=>{
    const proModal=useProModal();
    const [mounted,setMounted]=useState(false);

    useEffect(()=>{
        setMounted(true);
    },[])

    if(!mounted)return null;

    return(
        <div className="px-3">
            <Card className="bg-white/10 border-0">
            <CardContent className="py-6">
                <div className="text-center text-sm text-white mb-4 space-y-2">
                    <p>
                        {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                    </p>
                    <Progress
                    className="h-3"
                    value={(apiLimitCount/MAX_FREE_COUNTS)*100}/>
                </div>
                <Button 
                className="w-full"
                variant="premium"
                onClick={proModal.open}>
                    Upgrade
                    <Zap className="w-4 h-4 ml-2 fill-white"
                    />
                </Button>
            </CardContent>
            </Card>
        </div>
    )
}
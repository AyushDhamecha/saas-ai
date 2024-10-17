'use client'

import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface MobileSidebarProps{
    apiLimitCount:number;
}

const MobileSidebar = ({
    apiLimitCount
}:MobileSidebarProps) => {
    return (
        <Sheet>
            {/* Use a div or span as the SheetTrigger to avoid nesting buttons */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;

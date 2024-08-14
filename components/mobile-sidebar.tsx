'use client'

import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileSidebar = () => {
    return (
        <Sheet>
            {/* Use a div or span as the SheetTrigger to avoid nesting buttons */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;

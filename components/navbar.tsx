import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs";
 
import MobileSidebar from "./mobile-sidebar";


export const Navbar = ()=>{
    return(
        <div className="flex item-center p-4">
            <MobileSidebar/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    )
}
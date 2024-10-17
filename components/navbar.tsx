import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs";
 
import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";


export const Navbar = async()=>{
    const apiLimitCount=await getApiLimitCount();
    return(
        <div className="flex item-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount}/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    )
}
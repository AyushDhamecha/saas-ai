
import { UserButton } from "@clerk/nextjs";

 
import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

import MobileSidebar from "@/components/mobile-sidebar";


export const Navbar = async()=>{
    const apiLimitCount=await getApiLimitCount();
    return(
        <div className="flex item-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount}/>

            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>

        </div>
    )
}

export default Navbar;
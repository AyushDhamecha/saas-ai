import {Navbar} from "@/components/navbar"
import Sidebar from "@/components/sidebar"

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 md:w-72 bg-gray-900 z-[80]">
                <Sidebar/>
            </div>
            <main className="md:pl-72">
                <Navbar/>
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;

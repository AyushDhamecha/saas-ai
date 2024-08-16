import Image from "next/image"



export const Loader =()=>{
    return(
        <div className="h-full flex flex-col gap-y-4 items-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                alt="Loading"
                fill
                src="/logo.png"
                />
            </div>
            <p className="text-sm text-muted-foreground">
                Genius is Thinking
            </p>
            </div>
    )
}
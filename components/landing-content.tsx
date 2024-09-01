"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name:"Antonio",
        avatar:"A",
        title:"Software Engineer",
        description: "This is the best application I've used!"

    },
    {
        name:"John",
        avatar:"B",
        title:"Software Tester",
        description: "This is the best application!"

    },
    {
        name:"Ayush",
        avatar:"A",
        title:"Java Developer",
        description: "Very nice application!!"

    },
    {
        name:"Angela",
        avatar:"C",
        title:"Ai Enthusiast",
        description: "Very nice application for different ai's!!"

    }
]
export const LandingContent =() =>{
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonial 
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item) =>(
                <Card key={item.description} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2">
                            <div>
                                <p className="text-lg">
                                    {item.name}
                                </p>
                                <p className="text-zinc-400 text-sm">
                                    {item.title}
                                </p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                        {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
            </div>
        </div>
    )
}
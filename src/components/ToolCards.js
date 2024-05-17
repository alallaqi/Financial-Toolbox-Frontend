import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useRouter } from 'next/router'; 

export default function App({ showFooter }) {
    const router = useRouter(); // Instantiate the router

    // Function to handle navigation with the tool type as a query parameter
    const navigateToCalculator = (toolType) => {
        router.push(`/calculations?tool=${toolType}`);
    };

    const tools = [
        { type: 'Mortgage', description: 'Calculate your mortgage', imgUrl: 'https://source.unsplash.com/random/real-estate' },
        { type: 'Investment', description: 'Explore investment options', imgUrl: 'https://source.unsplash.com/random/investment' },
        { type: 'Loan', description: 'Manage your loans', imgUrl: 'https://source.unsplash.com/random/loan' },
        { type: 'Retirement', description: 'Plan your retirement', imgUrl: 'https://source.unsplash.com/random/retirement' },
        { type: 'Emergency Fund', description: 'Build an emergency fund', imgUrl: 'https://source.unsplash.com/random/emergency-fund' }
    ];

    return (
        <div className="max-w-[900px] grid grid-cols-3 gap-4 px-8 mx-auto my-12">
            {tools.slice(0, 3).map((tool, index) => (
                <Card key={index} className="h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">{tool.type}</p>
                        <h4 className="text-white font-medium text-large">{tool.description}</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt={`${tool.type} background`}
                        className="z-0 w-full h-full object-cover"
                        src={tool.imgUrl}
                    />
                    {showFooter && (
                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div>
                                <p className="text-black text-tiny">Available Now.</p>
                                <p className="text-black text-tiny">Get notified.</p>
                            </div>
                            <Button onClick={() => navigateToCalculator(tool.type.toLowerCase())} className="text-tiny" color="primary" radius="full" size="sm">
                                Use App
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            ))}
            <div className="col-span-3 grid grid-cols-2 gap-4">
                {tools.slice(3).map((tool, index) => (
                    <Card key={index} className="h-[300px]">
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">{tool.type}</p>
                            <h4 className="text-white font-medium text-large">{tool.description}</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt={`${tool.type} background`}
                            className="z-0 w-full h-full object-cover"
                            src={tool.imgUrl}
                        />
                        {showFooter && (
                            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                <div>
                                    <p className="text-black text-tiny">Available Now.</p>
                                    <p className="text-black text-tiny">Get notified.</p>
                                </div>
                                <Button onClick={() => navigateToCalculator(tool.type.toLowerCase())} className="text-tiny" color="primary" radius="full" size="sm">
                                    Use App
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

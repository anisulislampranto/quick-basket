import React from 'react'

export default function ProductPlaceholder() {
    return (
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start md:overflow-scroll gap-10 h-[19rem]">
            {Array(6).fill(0).map((_, index) => (
                <div key={index} className="border-2 border-gray-100 p-5 hover:border-2 transition duration-1000 ease-in-out space-y-2 max-w-64 bg-gray-100 animate-pulse">
                    <div className="relative h-40 w-56 bg-gray-200 rounded-lg">
                        {/* Placeholder for image */}
                    </div>
                    <div className="flex items-start gap-2 justify-between">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
            ))}
        </div>
    )
}

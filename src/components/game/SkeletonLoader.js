import React from 'react';

function SkeletonLoader() {

    return <div className="flex flex-col justify-between p-10 h-full">
        <div className="gap-2 flex flex-col">
            <div className="h-10 w-3/4 bg-slate-300 rounded-lg animate-pulse"/>
            <div className="h-6 w-2/4 bg-slate-300 rounded-lg animate-pulse"/>
            <div className="h-6 w-2/4 bg-slate-300 rounded-lg animate-pulse"/>
            <div className="h-6 w-2/4 bg-slate-300 rounded-lg animate-pulse"/>
            <div className="h-6 w-2/4 bg-slate-300 rounded-lg animate-pulse"/>
            <div className="h-6 w-2/4 bg-slate-300 rounded-lg animate-pulse"/>
        </div>
        <div className="h-16 w-full bg-slate-300 rounded-lg animate-pulse" />
    </div>
}

export default SkeletonLoader;
import React, {useState, useEffect} from "react";
import SkeletonLoader from "./SkeletonLoader";
import ReactMarkdown from "react-markdown";


function GameSheet({}) {
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowSkeletonLoader(false);
        }, 2000);
    }, []);
    const gameSheetMarkdown = `
    *React-Markdown* is **Awesome**
    # header 1
    ## header 2
    ### header 3
    #### header 4
    `;

    return <div className='h-[50vh]'>
        {showSkeletonLoader && <SkeletonLoader />}
        {!showSkeletonLoader && <div className="flex flex-col justify-between p-10 h-full">
            <div className="prose lg:prose-xl">
                { gameSheetMarkdown.split('\n').map((line, index) => {
                    return <ReactMarkdown children={line.trim()} key={index}/> 
                }) }
            </div>
        </div>}
    </div>
}

export default GameSheet;
import React from "react";


function GameMarker({children}) {

    return <div className="h-6 w-6 border-2 border-white rounded-full bg-gray-600 flex justify-center items-center">
        <div className="h-4 w-4 bg-white rounded-full">
            {children}
        </div>
    </div>
}

export default GameMarker;
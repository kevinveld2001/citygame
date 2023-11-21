
import React, {useState, useEffect} from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { getSessionInfo } from "../../services/totoSessionService";
import { ImCross } from "react-icons/im";

function GameLink({ elId, sessionId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        (async () => {
            const session = await getSessionInfo(sessionId);
            const elementId = session.elements.find(element => element.id === elId)?.elementId;
            
            for (const challenge of session.challenges) {
                const elementNonRefId = challenge.graph.nodes.find(node => node.refId === elementId)?.id;
                for (const link of challenge.graph.links) {
                    if (link.source !== elementNonRefId) continue;
                    const targetElementId = challenge.graph.nodes.find(node => node.id === link.target).refId;
                    const element = session.elements.find(element => element.elementId === targetElementId);
                    
                    setLinks(links => {
                        if (links.find(link => link.id === element.id)) return links;
                        return [...links, {id: element.id, link:`/game/${sessionId}/${element.id}`, title: element.content.title}]
                    });
                }
            }
            setIsLoading(false);
        }) ();
    }, []);

    return <div className="border rounded-lg flex flex-col">
        <div className="bg-blue-100 rounded-t-lg p-4">
            <h2 className="font-bold">Next levels</h2>
        </div>
        {isLoading && <div className="p-4 border-t flex justify-center">
            <AiOutlineLoading className="animate-spin w-6 h-6" />
        </div>}
        {!isLoading && links.length === 0 && <div className="p-4 border-t">
            <span className="flex flex-row items-center gap-4">
                <ImCross  className="h-8 w-8"/> 
                There are no next levels
            </span>    
        </div>}
        {links.map(element => <a key={element.id} href={element.link} className="p-4 border-t">
            {element.title}
        </a>)}
    </div>
}

export default GameLink;

import React, {useState, useEffect, useContext} from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { getSessionInfo } from "../../services/totoSessionService";
import { ImCross } from "react-icons/im";
import SettingsContext from "../../services/SettingsContext";
import { Link } from "react-router-dom";

function GameLink({ elId, sessionId }) {
    const [settings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
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
                    
                    if (!element) continue;

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
            <h2 className="font-bold">{translations.GAME_LINKS_TITLE}</h2>
        </div>
        {isLoading && <div className="p-4 border-t flex justify-center">
            <AiOutlineLoading className="animate-spin w-6 h-6" />
        </div>}
        {!isLoading && links.length === 0 && <div className="p-4 border-t">
            <span className="flex flex-row items-center gap-4">
                <ImCross  className="h-8 w-8"/> 
                {translations.GAME_LINK_NO_LINKS}
            </span>    
        </div>}
        {links.map(element => <Link key={element.id} to={element.link} className="p-4 border-t" >
            {element.title}
        </Link>)}
    </div>
}

export default GameLink;
import ScrMult from "../../pages/games/ScrMult";



const map = new Map();

map.set("scrmult", <ScrMult />);
map.set("language", <>
    <Solutions element={element} data={element.solutions} elementId={elementId} sessionId={sessionId} updateLinks={updateLinks} />
    {element?.processed && <div className='flex flex-row justify-end'>
                    <button className='bg-blue-500 text-white rounded-xl px-4 py-2 mt-3'
                    onClick={() => {
                        console.log(unFinishedSessions);
                        if (unFinishedSessions.length == 0) {
                            navigate(`/quest/${session?.session?.id}`);
                        }
                        const element = unFinishedSessions[Math.floor(Math.random() * unFinishedSessions.length)];
                        navigate(`/game/${session?.session?.id}/${element?.id}`);
                    }}>
                        {translations.NEXT_BUTTON}
                    </button>
                </div>}
</>);


export default map;
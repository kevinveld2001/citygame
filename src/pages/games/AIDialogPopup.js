import { useState } from 'react';
import Sheet from 'react-modal-sheet';

function AIDialogPopup() {
    //const [sheetInfo, setSheetInfo] = useState({ open: false, isOpen: false, id: null });


    function onTapNextInfoOrClose() {

    }

    return (
    <>
        <div>
            <Sheet /*isOpen={false}*/ prefersReducedMotion={true}
                onTap={onTapNextInfoOrClose}
                detent='content-height'>
                {/*AI avatar image?*/}
                <Sheet.Container>
                    {/*<Sheet.Header />*/}
                    <Sheet.Content disableDrag={true}>
                    {/* whenever the sheet appears, it needs to have the info *element* content 
                        on click check if the next element is info, if yes swap content immediately, if no close sheet */}
                        <div className=''>

                        </div>
                        {/*<GameSheet elementId={  sheetInfo.id } sessionId={ sheetInfo.sessionId } />*/}
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    </>
    );
}


export default AIDialogPopup;
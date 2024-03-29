import QrScanner from "qr-scanner";
import React, {useState, useRef, useEffect, useContext} from "react";
import { FaCamera } from "react-icons/fa6";
import Sheet from 'react-modal-sheet'
import QrResult from "../components/qr/QrResult";
import SettingsContext from "../services/SettingsContext"

function QrScreen() {
    const [settings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    const [hasPermission, setHasPermission] = useState(false)
    const [scannedCode, setScannedCode] = useState(null);
    const cameraRef = useRef(null);


    useEffect(() => {
        if (cameraRef === null) return;
        
        let qrScanner = new QrScanner(cameraRef.current, (result) => {
            setScannedCode(result.data);
        },
        {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: 'environment',
        });

        (async () => {
            try {
                await qrScanner.start();
                setHasPermission(true);
            } catch (e) {
                setHasPermission(false);
            }
        }) ();

        return () => {
            qrScanner.destroy();
        }
    }, [cameraRef]);

    return <div className="h-full w-full" >
        {
            <>
                <div className={`h-full w-full relative overflow-hidden ${!hasPermission ? "hidden" : ""}`} id="videoDiv">
                    <video 
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                        ref={cameraRef}
                    />
                    <Sheet 
                        className="!absolute"
                        isOpen={scannedCode !== null}
                        onClose={() => {setScannedCode(null)}} detent='content-height' 
                        mountPoint={document.getElementById("videoDiv")}>
                    <Sheet.Container>
                        <Sheet.Header />
                        <Sheet.Content className="p-3">
                            <QrResult qrCode={scannedCode} />
                        </Sheet.Content>
                    </Sheet.Container>
                    </Sheet>
                </div>
                {!hasPermission &&
                    <div className="flex flex-col items-center p-8 gap-3">
                        <FaCamera className="w-20 h-20"/>
                        <h1 className="text-center text-2xl font-bold">{translations.QR_CODE_SCAN_PERMISSION_TITLE}</h1>
                        <span className="text-center">{translations.QR_CODE_SCAN_PERMISSION_DESCRIPTION}</span>
                    </div>
                }
            </>
        }
    </div>;
}

export default QrScreen;
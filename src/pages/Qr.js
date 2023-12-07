import QrScanner from "qr-scanner";
import React, {useState, useRef, useEffect} from "react";
import { FaCamera } from "react-icons/fa6";
import Sheet from 'react-modal-sheet'


function QrScreen() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scannedCode, setScannedCode] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        //check if camera permission is granted
        (async () => {
            const permission = await navigator.permissions.query({name:'camera'});

            if (permission.state === 'granted') {
                setHasPermission(true);
            } else {
                navigator.getUserMedia({video: true}, () => setHasPermission(true), () => setHasPermission(false));
            }
        }) ();
    }, []);

    useEffect(() => {
        if (!hasPermission) return;
        let qrScanner = new QrScanner(cameraRef.current, (result) => {
            setScannedCode(result.data);
        },
        {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: 'environment',
        });


        qrScanner.start();

        return () => {
            if (hasPermission) {
                qrScanner.destroy();
            }
        }
    }, [hasPermission]);


    return <div className="h-full w-full" >
        {
            hasPermission 
            ? <div className="h-full w-full relative overflow-hidden" id="videoDiv">
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
                        {scannedCode}
                    </Sheet.Content>
                </Sheet.Container>
                </Sheet>
            </div>
            : <>
                <div className="flex flex-col items-center p-8 gap-3">
                    <FaCamera className="w-20 h-20"/>
                    <h1 className="text-center text-2xl font-bold">Enable camera permissions</h1>
                    <span className="text-center">To use the in app Qr code scanner, you need to give permission to use the camera. If you don't want to give permission you can also use the qr code scanner on you phone.</span>
                </div>
            </>
        }
    </div>;
}

export default QrScreen;
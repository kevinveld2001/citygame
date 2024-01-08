import React, {useContext, useState, useEffect} from "react";
import SettingsContext from "../services/SettingsContext";
import { Link } from "react-router-dom";
import LanguagePicker from "../components/settings/LanguagePicker";
import { getIdentity, logout, uploadProfile } from "../services/accountService";
import { AiOutlineLoading } from "react-icons/ai";
import ProfileImage from "../components/ProfileImage";

function Settings() {
  const [settings, setSettings] = useContext(SettingsContext);
  const translations = settings?.translations[settings?.language];
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState("WAITING");

  useEffect(() => {
      (async() => {
          const user = await getIdentity();
          setUser(user);
      }) ();
  }, []);
  
  async function handleFileUpload(file) {
    setUploadingStatus("UPLOADING");
    const res = await uploadProfile(user?.id, file);
    console.log(res);
    
  }

  return (
    <div className='p-6 overflow-y-scroll w-full'>
        <h1 className='font-semibold text-5xl mb-6'>{translations.SETTINGS_SCREEN_TITLE}</h1>

        <LanguagePicker saveToToto={true} />
        
        <h2 className="font-semibold text-xl">
          {translations.SETTINGS_ACOUNTSETTING_TITLE}
        </h2>
        <div className="flex flex-row mt-3">
          <ProfileImage user={user} size="h-16 w-16" />
          <label htmlFor="dropzone" 
            className="ml-3 border-dashed border-4 border-stone-200 hover:border-stone-400 flex-1 rounded-lg cursor-pointer"
            onDrop={(event) => {
              event.preventDefault();
              if (event.dataTransfer.files.length > 0) {
                handleFileUpload(event.dataTransfer.files[0]);
              }
            }}
            onDragOver={(event) => event.preventDefault()}>

            {uploadingStatus === "WAITING" && <>
              drop file
            </>}

            {uploadingStatus === "UPLOADING" && <div className="flex justify-center items-center h-full">
              <AiOutlineLoading className="animate-spin w-6 h-6" />
            </div>}

            {uploadingStatus === "UPLOADED" && <>
              file uploaded
            </>}

            <input type="file" id="dropzone" className="hidden" accept=".png, .gif, .jpeg"
              onChange={(event) => {
                const files = event.target.files;
                if (files.length > 0) {
                  handleFileUpload(files[0]);
                }
              }}
            />
          </label>
        </div>
        <a className="text-red-500 underline cursor-pointer"
          onClick={async () => {
            if (loading === true) return;
            setLoading(true);
            await logout();
            localStorage.clear();
            setSettings({...settings, auth: null});
          }}>
          <div className="border my-4 rounded-lg flex flex-col p-3">
              {loading? <AiOutlineLoading className="animate-spin w-6 h-6" /> :translations.SETTINGS_ACOUNTSETTING_LOG_OUT_BUTTON}
          </div>
        </a>

        
        {process.env.REACT_APP_EXPERIMENTAL_FEATURES === 'true' && <>
          <Link to='/experimental' className='text-blue-500 underline'>experimental features</Link>
        </> }
    </div>
  )
}

export default Settings
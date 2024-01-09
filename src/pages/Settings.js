import React, {useContext, useState, useEffect} from "react";
import SettingsContext from "../services/SettingsContext";
import { Link } from "react-router-dom";
import LanguagePicker from "../components/settings/LanguagePicker";
import { getIdentity, logout, uploadProfile } from "../services/accountService";
import { AiOutlineLoading } from "react-icons/ai";
import ProfileImage from "../components/ProfileImage";
import { FaFileUpload } from "react-icons/fa";
import { LuFileCheck, LuFileQuestion } from "react-icons/lu";

function Settings() {
  const [settings, setSettings] = useContext(SettingsContext);
  const translations = settings?.translations[settings?.language];
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState("WAITING");

  async function getUser() {
    const user = await getIdentity();
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, []);
  
  async function handleFileUpload(file) {
    setUploadingStatus("UPLOADING");
    const res = await uploadProfile(user?.id, file);
    
    if (res.ok) {
      setUploadingStatus("UPLOADED");
      getUser();
    } else {
      setUploadingStatus("FAILED");
    }
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
            className="ml-3 border-dashed border-4 border-stone-200 hover:border-stone-400 flex-1 rounded-lg cursor-pointer flex justify-center items-center"
            onDrop={(event) => {
              event.preventDefault();
              if (event.dataTransfer.files.length > 0) {
                handleFileUpload(event.dataTransfer.files[0]);
              }
            }}
            onDragOver={(event) => event.preventDefault()}>

            {uploadingStatus === "WAITING" && <>
              <FaFileUpload className="h-10 w-10 mr-3" />
              <span className="font-semibold text-lg">Upload file</span>
            </>}

            {uploadingStatus === "FAILED" && <>
              <LuFileQuestion className="h-10 w-10 mr-3 text-red-600" />
              <span className="font-semibold text-lg text-red-600">Failed to upload file</span>
            </>}

            {uploadingStatus === "UPLOADING" && <>
              <AiOutlineLoading className="animate-spin w-6 h-6" />
            </>}

            {uploadingStatus === "UPLOADED" && <>
              <LuFileCheck className="h-10 w-10 mr-3 text-green-600" />
              <span className="font-semibold text-lg text-green-600">File uploaded</span>
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
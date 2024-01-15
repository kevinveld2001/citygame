import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SettingsContext, {rawSettings} from './services/SettingsContext';
import Tabbar from './components/tabbar/Tabbar';
import Map from './pages/Map';
import QuestList from './pages/QuestList';
import Settings from './pages/Settings';
import GameScreen from './pages/Game';
import HomeScreen from './pages/Home';
import InstallBar from './components/InstallBar';


import AuthScreen from './pages/Auth';
import LoginScreen from './pages/auth/Login';
import RegisterScreen from './pages/auth/Register';

import Experimental from './pages/experimental/Experimental';
import Notifications from './pages/experimental/Notifications';
import QrGenScreen from './pages/experimental/QrGen';
import { scheduleNotificationFromStoreage } from './services/NotificationService';
import QuestScreen from './pages/Quest';
import QrScreen from './pages/Qr';
import { clearAllCookies } from './services/cookieService';
import { getIdentity, languageMap } from './services/accountService';
import AccountUpgrade from './pages/settings/AccountUpgrade';
scheduleNotificationFromStoreage();

function App() {
  const location = useLocation(); 
  const pathsWithTabbar = ['/quest', '/settings', '/map', '/qr', '/h/'	];

  const [settings, setSettings] = useState(rawSettings);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("/serviceworker.js");
    }

    async function checkIdentity() {      
      const identity = await getIdentity();
      if (!identity?.id && !location.pathname.includes("/auth") && window.localStorage.getItem("auth")) {
        // go to login screen
        localStorage.clear();
        clearAllCookies();
        window.location.href = "/auth?error=1";
      }
    }

    checkIdentity();
    if (!location.pathname.includes("/auth")) {
      setInterval(checkIdentity, 60000);
    }
    
    //load language
    (async () => {
      if (location.pathname.includes("/auth")) return;
      const user = await getIdentity();

      if (!user?.lang) return;
      setSettings({
        ...settings,
        language: languageMap.find(map => map.toto === user?.lang)?.local
      });
    }) ();
  }, [])


  return (
    <div className='h-[100%] w-screen flex flex-col overflow-hidden'>
      <SettingsContext.Provider value={[settings, setSettings]}>
        <InstallBar />
        <div id='main-container' className='flex-1 flex overflow-auto'>
          {settings.auth === null && !location.pathname.includes("/auth") ? (<Navigate to="/auth" />) : <></>}
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/map' element={<Map />} />
            <Route path='/quest/list' element={<QuestList />} />
            <Route path='/quest/:id' element={<QuestScreen />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/settings/upgrade' element={<AccountUpgrade />} />
            <Route path='/game/:sessionId/:elementId' element={<GameScreen />} />
            {process.env.REACT_APP_EXPERIMENTAL_FEATURES === 'true' && <>
              <Route path='/experimental' element={<Experimental />} />
              <Route path='/experimental/notifications' element={<Notifications />} />
              <Route path='/experimental/qrgen' element={<QrGenScreen />} />
            </> }
            <Route path='/auth' element={<AuthScreen />} />
            <Route path='/auth/login' element={<LoginScreen />} />
            <Route path='/auth/register' element={<RegisterScreen />} />
            <Route path='/qr' element={<QrScreen />} />
            <Route path='/h/*' element={<HomeScreen />} />
          </Routes>
        </div>
        {pathsWithTabbar.some((pathWithTabbar) => location.pathname.includes(pathWithTabbar) || location.pathname === "/") ? <Tabbar /> : <></>}
      </SettingsContext.Provider>
    </div>
  );
}

export default App;

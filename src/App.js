import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SettingsContext, {rawSettings} from './services/SettingsContext';
import Tabbar from './components/tabbar/Tabbar';
import Map from './pages/Map';
import Book from './pages/Book';
import Settings from './pages/Settings';
import InstallBar from './components/InstallBar';

import AuthScreen from './pages/Auth';
import LoginScreen from './pages/auth/Login';
import RegisterScreen from './pages/auth/Register';

import Experimental from './pages/experimental/Experimental';
import Notifications from './pages/experimental/Notifications';
import { scheduleNotificationFromStoreage } from './services/NotificationService';
scheduleNotificationFromStoreage();

function App() {
  const location = useLocation(); 
  const pathWithTabbar = ['/book', '/settings', '/'];
  const [settings, setSettings] = useState(rawSettings);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("/serviceworker.js");
    }
  }, [])


  return (
    <div className='h-[100%] w-screen flex flex-col overflow-hidden'>
      <SettingsContext.Provider value={[settings, setSettings]}>
        <InstallBar />
        <div className='flex-1 flex overflow-auto'>
          {settings.auth === null && !location.pathname.includes("/auth") ? (<Navigate to="/auth" />) : <></>}
          <Routes>
            <Route path='/' element={<Map />} />
            <Route path='/book' element={<Book />} />
            <Route path='/settings' element={<Settings />} />
            {process.env.REACT_APP_EXPERIMENTAL_FEATURES === 'true' && <>
              <Route path='/experimental' element={<Experimental />} />
              <Route path='/experimental/notifications' element={<Notifications />} />
            </> }
            <Route path='/auth' element={<AuthScreen />} />
            <Route path='/auth/login' element={<LoginScreen />} />
            <Route path='/auth/register' element={<RegisterScreen />} />
          </Routes>
        </div>
        {pathWithTabbar.includes(location.pathname) ? <Tabbar /> : <></>}
      </SettingsContext.Provider>
    </div>
  );
}

export default App;

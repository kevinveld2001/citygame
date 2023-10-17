import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SettingsContext, {rawSettings} from './services/SettingsContext';
import Tabbar from './components/tabbar/Tabbar';
import Map from './pages/Map';
import Book from './pages/Book';
import Settings from './pages/Settings';
import InstallBar from './components/InstallBar';
import EnableLocation from './pages/EnableLocation';
import LoginScreen from './pages/Login';

function App() {
  const location = useLocation(); 
  const pathWithTabbar = ['/book', '/settings', '/'];
  const [settings, setSettings] = useState(rawSettings);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("/serviceworker.js");
    }
  }, [])
  const [homeScreen, setHomeScreen] = useState(<EnableLocation/>);

  function handlePermissionStatusChange(permissionStatus) {
    switch (permissionStatus.state) {
      case "granted":
        setHomeScreen(<Map />);
        break;
      case "denied":
        setHomeScreen(<EnableLocation showEnableLocationButton={false} />);
        break;
      default:
        setHomeScreen(<EnableLocation showEnableLocationButton={true} />);
        break;
    }
  }

  useEffect(() => {
    //check permission status
    navigator.permissions.query({ name: "geolocation" })
      .then((result) => {
        handlePermissionStatusChange(result);
        result.onchange = () => {
            handlePermissionStatusChange(result);
        };
      });
  }, []);
  console.log(pathWithTabbar.includes(location.pathname));

  return (
    <div className='h-[100%] w-screen flex flex-col overflow-hidden'>
      <SettingsContext.Provider value={[settings, setSettings]}>
        <InstallBar />
        <div className='flex-1 flex overflow-auto'>
          {window.localStorage.getItem('auth') === null ? (<Navigate to="/login" />) : <></>}
          <Routes>
            <Route path='/' element={homeScreen} />
            <Route path='/book' element={<Book />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<LoginScreen />} />
          </Routes>
        </div>
        {pathWithTabbar.includes(location.pathname) ? <Tabbar /> : <></>}
      </SettingsContext.Provider>
    </div>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Tabbar from './components/tabbar/Tabbar';
import Map from './pages/Map';
import Book from './pages/Book';
import Settings from './pages/Settings';
import EnableLocation from './pages/EnableLocation';
import { useEffect, useState } from 'react';

function App() {
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

  return (
    <div className='h-[100%] w-screen flex flex-col overflow-hidden'>
      <div className='flex-1 flex overflow-auto'>
        <Routes>
          <Route path='/' element={homeScreen} />
          <Route path='/book' element={<Book />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
      <Tabbar />
    </div>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Tabbar from './components/tabbar/Tabbar';
import Map from './pages/Map';
import Book from './pages/Book';
import Settings from './pages/Settings';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("/serviceworker.js");
    }
  }, [])

  return (
    <div className='h-[100%] w-screen flex flex-col overflow-hidden'>
      <div className='flex-1 flex overflow-auto'>
        <Routes>
          <Route path='/' element={<Map />} />
          <Route path='/book' element={<Book />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
      <Tabbar />
    </div>
  );
}

export default App;

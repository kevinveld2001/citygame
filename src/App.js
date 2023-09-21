import './App.css';
import { Routes, Route } from 'react-router-dom';
import Map from './pages/Map';
import Book from './pages/Book';
import Settings from './pages/Settings';

function App() {
  return (
    <div className='h-screen w-screen'>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/book' element={<Book />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

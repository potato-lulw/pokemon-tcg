import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Board from './pages/board';



function App() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-main-bg bg-cover bg-opacity-50 fixed inset-0 blur-sm"></div>
      <div className="relative z-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Board />}/> 
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

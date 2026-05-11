import MainPage from './components/MainPage.jsx';
import Map from './components/Map.jsx';
import AboutUs from './components/AboutUs.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
   return (
   <BrowserRouter>
     <div className="appframe">
       <NavBar />
       <main className="content">
         <Routes>
           <Route path='/' element={<MainPage/>}/>
           <Route path='/map' element={<Map/>}/>
           <Route path='/about' element={<AboutUs/>}/>
         </Routes>
       </main>
       <Footer />
     </div>
   </BrowserRouter>
   )
}


export default App;
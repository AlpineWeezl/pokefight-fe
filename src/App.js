import { Route, Routes } from 'react-router-dom';
import './App.css';
import Arena from './components/Arena';
import Footer from './components/Footer';
import Highscores from './components/Highscores';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon'

function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            <header className="App-header">
                <Navbar />
            </header>
            <main className='flex-grow'>
                <div className='py-3 px-5'>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/arena'} element={<Arena />} />
                    <Route path={'/pokemon'} element={<Pokedex />} />
                    <Route path={'/pokemon/:id'} element={<Pokedex />} />
                    <Route path={'/pokemon/:id/:info'} element={<Pokemon />} />
                    <Route path={'/highscores'} element={<Highscores />} />
                </Routes>

                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;

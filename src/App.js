import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Highscores from './components/Highscores';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon'

function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            <header className="App-header mb-auto h-10">
                <Navbar />
            </header>
            <main className='flex-grow'>
                <div className='py-3 px-5'>

                <h1 className="text-3xl font-bold underline text-center">
                    Hello world!
                </h1>
                <Routes>
                    <Route path={'/'} element={<h1>Hello</h1>} />
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

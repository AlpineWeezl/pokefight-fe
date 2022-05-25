import { Route, Routes } from 'react-router-dom';
import './App.css';
import Pokedex from './components/Pokedex';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <body>
                <h1 className="text-3xl font-bold underline text-center">
                    Hello world!
                </h1>
                <Routes>
                    <Route path={'/'} element={<h1>Hello</h1>} />
                    <Route path={'/pokemon'} element={<Pokedex />} />
                </Routes>
            </body>
        </div>
    );
}

export default App;

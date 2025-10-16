import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Body from './Components/Body';
import Chat from './Components/Chat';
import Login from './Components/login';

function App() {

  return (
    <div className="bg-[url('https://imgs.search.brave.com/TWxuH08qIaymOjXhqVu9PvP8KGbBqHes5y87FPoGND4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS8yMC84/My9PNEdUTkQuanBn')] bg-cover">
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element = { <Body /> }>
            <Route path='/chat' element = { <Chat /> } />
            <Route path='/login' element = { <Login /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

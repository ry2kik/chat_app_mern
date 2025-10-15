import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Body from './Components/Body';
import Chat from './Components/Chat';
import Login from './Components/login';

function App() {

  return (
    <div>
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

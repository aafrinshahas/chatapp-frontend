import Login from "./components/Login"
import Chat from "./components/Chat"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './style.css'
import Totalchats from "./components/Totalchats";

function App() {
return (
<div>
<BrowserRouter>
<Routes>
<Route path="/" element={<Login/>}></Route>
<Route path="/chat" element={<Chat/>}></Route>
<Route path="/totalchats" element={<Totalchats/>}></Route>
</Routes>
</BrowserRouter>
</div>
);
}

export default App;

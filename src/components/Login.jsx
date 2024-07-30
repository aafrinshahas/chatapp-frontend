import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login(){
const [user, setUser] = useState('');
const [room, setRoom] = useState('');
const navigate = useNavigate();

 const handleRegister = async (e) => {
 e.preventDefault();
 if (user === '' || room === '') {
  alert('Please enter both username and room');
  return;
}
try {
 const res = await axios.post('http://localhost:5000/join', { name: user, room: room });
console.log(res.data)
if(res.data == 'success'){
  console.log('go to chat')
  navigate(`/chat?name=${user}&room=${room}`)
}
}catch (error) {
  console.error('Error sending message:', error);
  // Handle error as needed (e.g., show error message to user)
}
  
 
 };

return(
<div className="login">

<div className="flex flex-col gap-5 w-[100%]">
<h1 className="text-2xl font-semibold text-white">Hey, Welcome to <span className="text-[#35FFEB]">GroupConnect</span></h1>
<p className="text-md text-gray-200">Enter your credentials to access your  <span className="text-[#35FFEB] border-b">Chat Group</span></p>

<input 
placeholder="Enter the username" 
onChange={(e)=> setUser(e.target.value)}
className="border border-[#35FFEB] p-3 rounded-md bg-transparent placeholder:text-gray-200 outline-none text-white"
/>

<input 
placeholder="Enter the group name" 
onChange={(e)=>setRoom(e.target.value)}
className="border border-[#35FFEB] p-3 rounded-md bg-transparent placeholder:text-gray-200 outline-none text-white"
/>

{/* <Link  >
<button onClick={handleRegister} className="bg-[#35FFEB] font-semibold text-lg capitalize p-2 rounded-md w-[20%]" >login</button>
</Link> */}
<button  onClick={handleRegister} className="bg-[#35FFEB] font-semibold text-lg capitalize p-2 rounded-md w-[20%]" >login</button>
</div>

</div>
)
}

export default Login;
    import { useEffect } from "react";
    import io from 'socket.io-client'
    import { useState } from "react";
    import { Link } from "react-router-dom";
    import Totalchats from "./Totalchats";
    import { baseUrl } from "../Url";
import axios from "axios";
   


    let socket;
    function Chat(){
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState(new Date().toLocaleString());
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [sideBar, setSidebar] = useState(false);
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    // const formattedDateTime = date.toLocaleString();
    // setDate(formattedDateTime)
    function displaySidemenu(){
    setSidebar(!sideBar)
    }

    const backendUrl = baseUrl
    useEffect(()=>{
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const room = params.get('room');

    setUser(name);
    setRoom(room)
    console.log(name, room)
    socket = io(backendUrl)
    socket.emit('join', {name:name, room:room, date}, (err)=>{
    if(err){
    alert(err)
    }
    })
    return () => {
    socket.disconnect();
    socket.off();
    }
    }, [backendUrl,window.location.search])

    useEffect(() => {
    socket.on('message', msg => {
    setMessages(prevMessages => [...prevMessages, msg])
    setTimeout(() => {
    var div = document.getElementById("chat_body");
    div.scrollTop = div.scrollHeight ;
    }, 100)
    })
    socket.on('roomMembers', usrs => {
    setUsers(usrs)
    })
    }, [])

    const sendMessage = async (e) => {
        e.preventDefault();
    
        if (message === '') {
          alert('Write the message before send');
          return;
        }
    
        try {
          // Send message to server via Axios POST request
          await axios.post(`${baseUrl}/message`, { message : message });
    
          // Emit message to socket.io server (assuming socket is initialized elsewhere)
          socket.emit('sendMsg', message, () => setMessage(''));
    
          // Scroll to bottom of chat body after a slight delay
          setTimeout(() => {
            var div = document.getElementById('chat_body');
            div.scrollTop = div.scrollHeight;
          }, 100);
        } catch (error) {
          console.error('Error sending message:', error);
          // Handle error as needed (e.g., show error message to user)
        }
      };
   


    return(
    <div className="chat">

    {/* Dashboard */}
    <div className="dashboard rounded-md flex flex-col justify-between shadow-md shadow-slate-600 flex-grow">
    <div>
    <div className="logo text-xl flex items-center gap-4 font-semibold text-[#35FFEB] justify-center p-4  shadow-md shadow-slate-800">
    <h1>GroupConnect</h1>
    <i class="fa-solid fa-users-rectangle"></i>
    </div>

    <div className="options p-4 flex justify-between items-center font-semibold text-lg text-white">

    <Link to='/totalchats'>
    <p className='capitalize'><i class="fa-brands fa-rocketchat text-[#35FFEB] pr-2"></i> Chat details</p>
    </Link>

    </div>
    <div className='totalchats'>
    <Totalchats messages={messages} room={room} users={users}/>
    </div>

    </div>
    <div className="logout text-lg text-white capitalize font-semibold p-3">
    <Link to='/'><p><i class="fa-solid fa-right-from-bracket text-[#35FFEB]"></i> logout</p></Link>
    </div>

    </div>

    {/* mobile view menu bar and logo*/}
    <div className="mobile-view w-[100%]">
    <div className="flex flex-grow justify-between p-3 shadow-md shadow-slate-600">
    <div className="logo text-lg font-semibold text-[#35FFEB] flex items-center gap-3">
    <h1>GroupConnect</h1>
    <i class="fa-solid fa-users-rectangle"></i>
    </div>
    <div className="menu-bar text-lg font-semibold cursor-pointer" onClick={displaySidemenu}>
    <i class="fa-solid fa-bars bg-[#35FFEB] px-3 py-2 rounded-md"></i>
    </div>
    </div>
    </div>

    {/* sidebar */}
    <div className={sideBar? 'side active' : 'side'}>

    {/* close and logout */}
    <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-10 bg-[#1B1E21]">
    <div className="text-white capitalize font-semibold transform rotate-180">
    <Link to='/'><p><i class="fa-solid fa-right-from-bracket text-[#35FFEB] text-xl"></i></p></Link>
    </div>
    <div className="close text-lg font-semibold cursor-pointer text-right" onClick={displaySidemenu}>
    <i class="fa-solid fa-xmark bg-[#35FFEB] p-2 rounded-md"></i>
    </div>
    </div>

    {/* side-menu */}
    <div className="side-menu text-lg font-semibold mt-2 mb-6" onClick={displaySidemenu}>
    <div>
    <div className="options p-4 flex justify-between items-center font-semibold text-md text-white">
    <Link to='/totalchats'>
    <p className='capitalize'><i class="fa-brands fa-rocketchat text-[#35FFEB] pr-2"></i> Chat details</p>
    </Link>

    </div>
    <div className='totalchats'>
    <Totalchats messages={messages} room={room} users={users}/>
    </div>
    </div>

    </div>  
    </div>

    {/* conversation */}

    <div className="conversation rounded-md shadow-md shadow-slate-600 flex-grow" id="chat_body">

    {/* header */}

    <div className="header bg-[#202427] p-5 text-white font-semibold text-lg rounded-t-md rounded-md shadow-md shadow-slate-700 capitalize">
    <p>Chat Group Name: <span className="text-[#35FFEB]">{room}</span> | username: <span className="text-[#35FFEB]">{user}</span></p>
    </div>

    {/* messages */}
    <div className="messages flex flex-col justify-between" >

    <div>
    {
    messages.map((msg, indx) => (
    msg.user !== user?.toLowerCase() 

    ? 
    <div className="flex justify-start">
     
    <div className="message-left m-4" key={indx}>
    <div className="text-white font-semibold capitalize w-16 text-left">
     <p>{msg.user}</p>
    </div>
   
    <div className="font-semibold text-gray-800 p-3 mt-2 bg-[#35FFEB] capitalize break-words rounded-r-md rounded-b-md rounded-tl-sm">
    <p>{msg.text}</p>
    </div>
    <div className="text-white font-semibold capitalize">
    <p>{msg.date}</p>
    </div>
    </div>
    </div> 
    : 
    <div className="flex justify-end">

<div className="message-right m-4" key={indx}>
    
    <div className="font-semibold text-gray-800 p-3 mb-2 bg-[#35FFEB] capitalize break-words rounded-l-md rounded-t-md rounded-br-sm">
    <p>{msg.text}</p>
    </div>
    <div className="text-white font-semibold capitalize w-16 float-right text-right">
     <p>{msg.user}</p>
    </div>
    <div className="text-white font-semibold capitalize">
    <p>{msg.date}</p>
    </div>
    </div>
    </div>    

    ))
    }
    </div>

    {/* write message */}
    <div className="write-message bg-[#202427] p-5 flex items-center justify-between">
    <input type="text" value={message}
    onKeyPress={(e)=> e.key === "Enter" ? sendMessage(e) : null}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Write a message here"
    className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full capitalize"
    />
    <i class="fa-solid fa-paper-plane cursor-pointer text-[#35FFEB]" onClick={(e)=>e.message === "" ? null : sendMessage(e)}></i>
    </div>
    </div>

    </div>

    </div>
    )
    }

    export default Chat;
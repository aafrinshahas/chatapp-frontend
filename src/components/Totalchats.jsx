

function Totalchats(props){
const messages = props.messages;
const room = props.room;
const users = props.users
console.log(users)
return(
<div className="px-4">
<p className="text-gray-200 text-md font-semibold py-2">All messages <span className="text-[#35FFEB]">{messages.length}</span></p>
<p className="text-gray-200 text-md font-semibold py-2">Currently we have <span className="text-[#35FFEB]">{users.length}</span> users in <span className="text-[#35FFEB] capitalize">{room}</span> group</p>
<p className="text-[#35FFEB] text-lg font-semibold py-2">User List</p>
{users.map((user, id)=>(
<div key={id} className="bg-[#1B1E21] p-4 my-2 shadow-sm shadow-slate-600">
<p className="text-gray-200 text-md font-semibold capitalize">{user.name}</p>
</div>

))}
</div>
)
}

export default Totalchats;
import "./style.css"
import {userData} from "./data"

const SidebarChat = ()=>{
    return (
        <ul className="sidebarchat">
            {userData.map((data)=>{
                return(
                    <li className="conversas">
                        {data.name}
                    </li>
                )
            })}
        </ul>
    );
}

export default SidebarChat
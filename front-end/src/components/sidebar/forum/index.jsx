import "./style.css"
import {forumData} from "./data"
const SidebarForum = ()=>{
    return (
        <ul className="sidebarforum ">
            {forumData.map((data)=>{
                return(
                    <li className="engenharias">
                        {data.name}
                    </li>
                )
            })}
        </ul>
    );
}

export default SidebarForum
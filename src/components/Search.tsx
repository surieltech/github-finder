type SearchProps = {
    loadUser: (userName: string) => Promise<void>;
}

import { useState, KeyboardEvent } from "react";
import { BsSearch } from "react-icons/bs"
import classes from './Search.module.css'

const Search = ({loadUser}: SearchProps) => {

    const [userName, setUserName] = useState("");

    //evento para algo acontecer se pressionar enter
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter"){
            loadUser(userName);
        }
    }

  return (
    <div className={classes.search}>
        <h2>Busque por usuário(a):</h2>
        <p>Conheça seus melhores repositórios</p>
        <div className={classes.search_container}>
            <input type="text" placeholder='Digite o nome do usuário' onChange={(e)=> setUserName(e.target.value)}
            //acao para quando for pressionar alguma tecla
            onKeyDown={handleKeyDown}/>
            <button onClick={() => loadUser(userName)}><BsSearch></BsSearch></button>
        </div>
    </div>
  )
}

export default Search
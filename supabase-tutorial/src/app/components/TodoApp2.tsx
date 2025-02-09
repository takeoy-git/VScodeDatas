import React, { useEffect, useState } from "react";
import { getAllTodos } from "../../../supabase/supabaseFunc";


const TodoApp: React.FC = () => {
    const [todos,setTodos]=useState([])
    useEffect( ()=>{
        const todos=getAllTodos()


    });

    return (<section>
        <h3 className="text-2xl ">Supabese TodoApply</h3>
        <form>
            <input type="text" className="shadow-1g p-1 outline-none" />
        <button className="shadow-md border-2 px-1 py-1 rounded-1g">add</button>
        </form>
        </section>)
  };
  
  export default TodoApp;
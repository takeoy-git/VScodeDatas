"use client"
import React, { useEffect, useState } from "react";
import { getAllTodos } from "../../../supabase/supabaseFunc";
import TodoList from "./TodoList";

type Todo={
id:number;
title:string
}


const TodoApp: React.FC = () => {

    const [todos,setTodos]=useState<Todo[]>([])
    useEffect( ()=>{
        const getTodos= async ()=>{

            const fetchedTodos:Todo[]|null=await getAllTodos()
            setTodos(fetchedTodos??[])
        }
getTodos()

    },[]);

    return (<section>
        <h3 className="text-2xl ">Supabese TodoApply</h3>
        <form>
            <input type="text" className="shadow-1g p-1 outline-none" />
        <button className="shadow-md border-2 px-1 py-1 rounded-1g">add</button>
        </form>
        <TodoList todos={todos}/>
        </section>)
  };
  
  export default TodoApp;
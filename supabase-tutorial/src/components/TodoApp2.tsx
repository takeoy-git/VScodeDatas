"use client"
import React, { useEffect, useState } from "react";
import { getAllTodos } from "../../lib/supabase/supabaseFunc";
import TodoList from "./TodoList";

type Todo = {
    id: number;
    title: string;
};

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null); // 初期値を `null` に変更

    useEffect(() => {
        const getTodos = async () => {
            const fetchedTodos = await getAllTodos();
            setTodos(fetchedTodos);
        };

        getTodos();
    }, []);

    return (
        <section>
            <h3 className="text-2xl">Supabase Todo App</h3>
            <form>
                <input type="text" className="shadow-lg p-1 outline-none" />
                <button className="shadow-md border-2 px-1 py-1 rounded-lg">Add</button>
            </form>
            {todos ? <TodoList todos={todos} /> : <p>Loading...</p>}
        </section>
    );
};

export default TodoApp;

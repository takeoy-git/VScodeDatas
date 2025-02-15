import React from "react";

type Todo = {
    id: number;
    title: string;
};

type Props = {
    todos?: Todo[];
};

const TodoList = ({ todos = [] }: Props) => { // デフォルト値を `[]` に設定
    if (!todos.length) {
        return <p>No todos available.</p>;}

    return (
        <ul>
            {todos.map((todo) => (
                <div key={todo.id} className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between text-red-900">
                    <li>{todo.title}</li>
                    <span>×</span>
                </div>
            ))}
        </ul>
    );
};

export default TodoList;

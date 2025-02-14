import React from "react";

type Todo={
    id:number;
    title:string
    }

type Props={
    todos:Todo[]
}

const TodoList = (props:Props) => {
    const {todos}= props;
    
    return (
    <>
    <ul>
    <ul>
            {todos.map((todo) => (
                <div key={todo.id} className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between text-red-900">
                    <li>{todo.title}</li>
                    <span>×</span>
                </div>
            ))}
        </ul>
        <div className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between text-red-900">
            <li>読書</li><span>×</span>
        </div>
        <div className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between text-red-900">
            <li>散歩</li><span>×</span>
        </div>
        <div className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between text-red-900">
            <li>育児</li><span>×</span>
        </div>
    </ul>
    </>
    )
};

export default TodoList;
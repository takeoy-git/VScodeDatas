import React from "react";

const TodoList: React.FC = () => {
    return (
    <>
    <ul>
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
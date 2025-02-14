
import {supabase} from "./supabase"
type Todo={
    id:number;
    title:string
    }

export const getAllTodos=async():Promise<Todo[]|null>=>{
   try{ const todos=await supabase.from("todo").select("*")
    return todos.data;
}catch (error){
    console.error(error);
    return null;
}}

import {supabase} from "./supabase"
type Todo={
    id:number;
    title:string
    }




    export async function getAllTodos(): Promise<Todo[]> {
        const { data, error } = await supabase.from("todos").select("*");
    
        if (error) {
            console.error("Error fetching todos:", error);
            return []; // エラー時は空配列を返す
        }
    
        if (!data) {
            console.warn("No data received from Supabase");
            return []; // データが `null` または `undefined` の場合も空配列
        }
    
        return data;
    }
    
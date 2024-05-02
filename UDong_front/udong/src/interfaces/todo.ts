export interface ITodoInfo {
    todoList: ITodoList[];
}

export interface ITodoList {
    id: number;
    content: string;
    status: boolean;
    date: string;
    assignedUserId: number;
    assignedUserName: string;
}

export interface IRoomInfo {
    roomName: string;
    rules: [];
    userList: IuserList[];
}

export interface IuserList {
    id: number;
    name: string;
    email: string;
    pictureUrl: string;
}

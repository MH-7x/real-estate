export interface UsersResponse {
    message: string;
    success: boolean;
    admins:  User[];
}

export interface User {
    _id:      string;
    name:     string;
    email:    string;
    password: string;
    __v:      number;
}

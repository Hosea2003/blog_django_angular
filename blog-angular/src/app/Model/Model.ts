export interface Token{
    refresh:string,
    access:string
}

export interface Blog{
    title:string,
    pk:number,
    content:string,
    created:string,
    updated:string,
    url:string,
    image:string | null,
    likes:number,
    comments:number,
    liked:boolean,
    user:{pk:number, username:string}
}

export interface BlogCreate{
    title:string,
    content:string,
    image:string,
    user:{pk:number, username:string}
}

export interface BlogCreateService{
    title:string,
    content:string,
    image:File|any
}

export interface User{
    pk:number,
    username:string,
    email:string
}

export interface Comment{
    pk:number
    username:string,
    comment:string
}
export class Todo {
    id:number
    title:string
    createdAt:string
    completed:boolean
    important:boolean
    expiredAt:string

    constructor(id:number, title:string, completed: boolean) {
        this.id = id
        this.title = title
        this.completed = completed
    }
}
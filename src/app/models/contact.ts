export class Contact{
    id:number
    first_name: string
    last_name: string
    avatar: string
    constructor(id, first_name, last_name, avatar){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.avatar = avatar
    }
}
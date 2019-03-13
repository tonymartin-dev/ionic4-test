import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

export interface Todo {
  title: string,
  description: string,
  urgente: boolean,
  completada: boolean

}

@Injectable({
  providedIn: 'root'
})
export class ItemFBService {

  private todosCollection: AngularFirestoreCollection<Todo>

  private todos: Observable<Todo[]>

  constructor(
    private db: AngularFirestore,
    private router: Router
    ) {

    this.todosCollection = db.collection<Todo>('todos');

    this.todos = this.todosCollection.snapshotChanges().pipe(

      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })

      })
    )
  }

  getTasks(){
    return this.todos;
  }

  getTaskById(id:string){
    console.log("Get todo: ", id);
    return this.todosCollection.doc<Todo>(id).valueChanges()
  }

  updateTask(todo:Todo, id:string){
    return this.todosCollection.doc(id).update(todo).then(()=>{
      this.goBack();
    });;
  }

  createTask(todo:Todo){
    return this.todosCollection.add(todo).then(()=>{
      this.goBack();
    });
  }
  
  deleteTask(id:string){
    return this.todosCollection.doc(id).delete().then(()=>{
      this.goBack();
    });;
  }

  filterTasks(value){
    this.todos.subscribe(res => {
      return res.filter( item => item.title.includes(value));
    })
  }

  goBack(){
    this.router.navigate(['home']);
  }


}

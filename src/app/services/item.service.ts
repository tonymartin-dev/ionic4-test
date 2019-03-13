import { Injectable } from '@angular/core';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { identifierModuleUrl } from '@angular/compiler';
import { TargetLocator } from 'selenium-webdriver';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private router: Router
  ) { }


  items: Array<any> = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      completa: false,
      urgente: true
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      completa: true,
      urgente: false
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      completa: true,
      urgente: true
    },
    {
      id: "4",
      title: "Task 4",
      description: "Description 4",
      completa: false,
      urgente: false
    }

  ];


  // obtener tareas, tarea por id, actualizar tarea, crear tarea, borrar tarea.

  generateId: Function = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  getTasks: Function = function(){
    return this.items;
  }

  getTaskById: Function = function(id){

    var matchingItem;

    this.items.forEach(item => {
        if(item.id == id){
          matchingItem = item;
        }
    });

    return matchingItem;
    
  };

  updateTask: Function = function(updatedItem){
    var items = this.items;
    this.items.forEach((item, index) => {
      if(item.id == updatedItem.id){
        items[index] = updatedItem;
      }
    });
    this.goBack();
  }

  createTask: Function = function(newItem){
    if(!newItem.id){
      newItem.id = this.generateId();
    }
    this.items.push(newItem);
    this.goBack();
  }

  deleteTask: Function = function(deleteItem){
    this.items.forEach((item, index) => {
      if(item.id == deleteItem.id){
        this.items.splice(index, 1);
      }
    });
  }

  completeTask: Function = function(completedTask){
    return new Promise(function(resolve, reject){
      this.items.forEach((item, index) => {
        if(item.id == completedTask.id){
          if(completedTask.completa){
            reject({
              msg: 'La tarea Ya está completada',
              id: completedTask.id,
              index: index
            });
          }
          item.completada = true;
          resolve({
            msg: 'La tarea ha sido completada',
            id: completedTask.id,
            index: index
          });
        }      
      });
    })
  }

  goBack: Function = function(){
    this.router.navigate(['home']);
  }

  filterTasks: Function = function(value){
    return this.items.filter( item => item.title.includes(value) );
  }


}

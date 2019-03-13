import { Component }    from '@angular/core';
import { NgModule }     from '@angular/core';
import { LoadingController }     from '@ionic/angular';
import { ItemService }  from '../../services/item.service'
import { ItemFBService, Todo }  from '../../services/item-fb.service'
import { AuthService }          from '../../services/auth.service'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private ItemService: ItemService,
    private ItemFBService: ItemFBService,
    private AuthService: AuthService,
    private loadingController: LoadingController
  ){}
  
  prueba: String;
  //items: Array<any>;
  items: Array<Todo>;
  originalItems:Array<any>;
  completeTask: Function;
  deleteTask: Function;
  getItems: Function;
  isLoading: boolean;
  noResults: boolean;

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.ItemFBService.getTasks().subscribe( res => {
      loading.dismiss();
      this.items = res;
      this.originalItems = [...res];
      console.log('Items: ', res);
    });
  }

  ngOnInit() {


    //this.items = this.ItemService.getTasks();
    this.presentLoading();

    console.log(this.items);
    console.log('Is logged in: ', this.AuthService.isLoggedIn);

    this.completeTask = id => {
      var taskToComplete = this.originalItems.find(item => {
        return item.id === id;
      });
      taskToComplete.completada = true;
      var taskId = taskToComplete.id;
      delete taskToComplete.id;
      this.ItemFBService.updateTask(taskToComplete, taskId).then(res =>{
        console.log('Task completed', res);
      });

    }

    this.deleteTask = id => {
      this.ItemFBService.deleteTask(id).then(res =>{
        console.log('Task deleted: ', res);
      })
    }

    this.getItems = event => {
      console.log('Input value: ',event.target.value);
      
      if(event.target.value.length === 0){
        this.items = this.originalItems;
      } else {
        var filteredItems = this.originalItems.filter( item => item.title.includes(event.target.value));
        if(filteredItems.length == 0){
          this.noResults = true;
        } else {
          this.noResults = false;
          this.items = filteredItems;
        }
      }

    }

    /*
     this.completeTask = id => {
      this.ItemService.completeTask(id).then(
        res => {
          console.log(res.msg, res);
        },
        err => {
          console.log(err.msg, err);
        }
      )
    }
    
    this.getItems = event => {
      console.log('Input value: ',event.target.value);
      this.items = this.ItemService.filterTasks(event.target.value);
      if(this.items.length == 0){
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    }*/
  }
}

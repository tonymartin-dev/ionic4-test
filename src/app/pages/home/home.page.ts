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
  completeTask: Function;
  getItems: Function;
  isLoading: boolean;
  noResults: boolean;

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
  }

  ngOnInit() {

    var originalItems;

    //this.items = this.ItemService.getTasks();
    this.ItemFBService.getTasks().subscribe( res => {
      this.items = res;
      originalItems = [...res];
      console.log('Items: ', res)

    });

    console.log(this.items);
    console.log('Is logged in: ', this.AuthService.isLoggedIn);

    this.completeTask = id => {
      var taskToComplete = originalItems.find(item => {
        return item.id === id;
      });
      taskToComplete.completada = true;
      var taskId = taskToComplete.id;
      delete taskToComplete.id;
      this.ItemFBService.updateTask(taskToComplete, taskId).then(res =>{
        console.log('Task completed', res);
      })

    }   

    this.getItems = event => {
      console.log('Input value: ',event.target.value);
      
      if(event.target.value.length === 0){
        this.items = originalItems;
      } else {
        var filteredItems = originalItems.filter( item => item.title.includes(event.target.value));
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

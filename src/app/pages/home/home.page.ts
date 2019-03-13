import { Component }    from '@angular/core';
import { NgModule }     from '@angular/core';
import { ItemService }  from '../../services/item.service'
import { ItemFBService, Todo }  from '../../services/item-fb.service'
import { AuthService }            from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private ItemService: ItemService,
    private ItemFBService: ItemFBService,
    private AuthService: AuthService
  ){}
  
  prueba: String;
  //items: Array<any>;
  items: Array<Todo>;
  completeTask: Function;
  getItems: Function;
  isLoading: boolean;
  noResults: boolean;

  ngOnInit() {

    //this.items = this.ItemService.getTasks();
    this.ItemFBService.getTasks().subscribe( res => {
      this.items = res;
      console.log('Items: ', res)

    });

    console.log(this.items);
    console.log('Is logged in: ', this.AuthService.isLoggedIn);

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
    }
  }
}

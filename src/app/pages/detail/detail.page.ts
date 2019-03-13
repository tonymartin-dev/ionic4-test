import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute}  from '@angular/router';
import { Validator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ItemService }            from '../../services/item.service'
import { ItemFBService, Todo }  from '../../services/item-fb.service'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  item: any;
  edit_item_form: any;
  submit: Function;
  isEdit: Boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private itemService: ItemService,
    private itemFBService: ItemFBService
  ) { }

  ngOnInit() {

    this.isEdit = false;

    this.edit_item_form = this.formBuilder.group({
      title:  new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      completada: new FormControl(false),
      urgente: new FormControl(false)
    });

    
    
    this.route.params.subscribe(
      data => {
        
        this.submit = (item, isEdit)=>{
          
          
          if(isEdit){
            //item.id = this.item.id;
            //this.itemService.updateTask(item);
            this.itemFBService.updateTask(item, data.id).then(res => {
              console.log('Task updated: ', res);
            })
          }else{
            //this.itemService.createTask(item)
            this.itemFBService.createTask(item).then(res => {
              console.log('Task created: ', res);
            });
          }
          console.log('Submit', item)
        }
        
        console.log('PARAMS: ', data);
        
        if(data.id){

          this.isEdit = true;

          console.log('ID: ', data.id);
          //Get item from service using id from param
          //this.item = this.itemService.getTaskById(data.id);
          this.itemFBService.getTaskById(data.id).subscribe(res => {
            this.item = res;
            console.log('ITEM: ', this.item);
            
            this.edit_item_form = this.formBuilder.group({
              id: new FormControl( data.id),
              title:  new FormControl(this.item.title, Validators.required),
              description: new FormControl(this.item.description, Validators.required),
              completada: new FormControl(this.item.completada),
              urgente: new FormControl(this.item.urgente)
            });
          });

        }else{

          console.log('No ID');
          //this.item = this.itemService.getTaskById(data.id);

        }
        
        console.log( 'FORM: ', this.edit_item_form);
        
      }
    )
  }

}

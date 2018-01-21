import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'; 
import { Observable } from "rxjs/Observable";
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SearchService]
})
export class HomeComponent implements OnInit {

  searchres: any;
  localstorageitem:any;
  searcheditem: any;
  xx:any;
  issearching: boolean;

  diclaimer:string;
  
  public loginForm = this.fb.group({
    email: [""]
  });

  constructor(private _searchService: SearchService,public fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this._searchService.search()
      .subscribe(res => {
        this.searchres = res;
        localStorage.setItem('cogoports', JSON.stringify(this.searchres))
      })
     this.localstorageitem = JSON.parse(localStorage.getItem('cogoports'))
    let n = this.localstorageitem.length;
    this.localstorageitem = this.localstorageitem.slice(1,n+1)
   

  }

  listsearch(str: string){
    let found = this.localstorageitem.find(item => {
      return item.title == str
   })
   return found;
  }

  SortByName(x,y) {
    return ((x.platform == y.platform) ? 0 : ((x.platform > y.platform) ? 1 : -1 ));
  }
  SortByscoreasc(x,y) {
    return ((x.score == y.score) ? 0 : ((x.score > y.score) ? 1 : -1 ));
  }
  SortByscoredes(x,y) {
    return ((x.score == y.score) ? 0 : ((x.score < y.score) ? 1 : -1 ));
  }

  sortplatform(){
    this.localstorageitem.sort(this.SortByName)

  }
  sortscore(sed:string){
    if( sed == 'asc')
    {
      this.localstorageitem.sort(this.SortByscoreasc)
    }
    else{
      this.localstorageitem.sort(this.SortByscoredes)
    }
  
  }
  
  doLogin(event) {
    this.issearching = true;
     this.xx = this.listsearch(this.loginForm.value.email);
console.log(this.xx)

  }
}
  




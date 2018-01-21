import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";



@Injectable()
export class SearchService{
    private searchUrl: string;
    
    constructor(private _http:Http){
        
    }
    
    search(){
        this.searchUrl = 'http://starlord.hackerearth.com/gamesarena';
        return this._http.get(this.searchUrl)
            .map(res => res.json());
    }
}
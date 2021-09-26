import { HttpClient } from '@angular/common/http';
import { Component,  AfterViewInit, ElementRef, ViewChild,OnInit ,Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent  implements AfterViewInit, OnInit {
selected = '';
data2 :any = [];
title = 'Carousel';
public searchKeyword = '';​

public data:any = [];​
public left_Data:any=[];
public bottom_Data:any=[];

public url = `https://api.unsplash.com/search/photos?client_id=${environment.client_id}&page=1&per_page=18&query=`;​



constructor(
  private http: HttpClient,
  private el: ElementRef,
  private renderer: Renderer2
) {}

@ViewChild('content', {static: true}) divContent: ElementRef | undefined;

ngOnInit() {}
ngAfterViewInit(){
  // const gridElement=(<HTMLElement>this.el.nativeElement).querySelector('mat-grid-tile-content');
  // const gridElement1=(<HTMLElement>this.el.nativeElement).querySelector('mat-grid-tile-content')?.innerHTML
  // console.log(gridElement)
  // this.renderer.removeClass()
  console.log(document.getElementsByClassName("mat-grid-tile-content")[1])
  this.renderer.removeClass(document.getElementsByClassName("mat-grid-tile-content")[1],'mat-grid-tile-content')
  // console.log(this.renderer.nextSibling(gridElement))
}
searchImage() {​
  this.searchKeyword = this.selected;
    this.http.get(this.url + this.searchKeyword).subscribe(​
    (res:any) => {​
      this.left_Data=[]
      this.bottom_Data=[]
      this.data = res['results'];​
      for(var i=0;i<this.data.length;i++){
        let imageName=this.searchKeyword+"-"+(i+1).toString()
        if(i<10){
          this.left_Data.push({"imgName":imageName,"imgUrl":this.data[i].urls.regular})
        }else{
          this.bottom_Data.push({"imgName":imageName,"imgUrl":this.data[i].urls.regular})
        }
        // console.log(this.data[i].urls.regular)
        // console.log(this.left_Data)
        // console.log(this.bottom_Data)
      }
      // this.data2 = this.data;
      // console.log(this.data)
  });​
}


drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}

}

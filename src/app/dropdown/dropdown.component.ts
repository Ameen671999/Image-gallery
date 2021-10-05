import { HttpClient } from '@angular/common/http';
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit,
  Renderer2,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements AfterViewInit, OnInit {
  selected: any;
  title = 'Carousel';
  public searchKeyword = '';
  public noOfImg = 1;
  public data: any = [];
  public left_Data: any = [];
  public bottom_Data: any = [];
  public category_Data: any = [];

  public url = `https://api.unsplash.com/search/photos?client_id=${environment.client_id}&page=1&per_page=`;
  public category_url = 'https://novolytics-carousel-api.herokuapp.com/api/categories'
  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @ViewChild('content', { static: true }) divContent: ElementRef | undefined;

  ngOnInit() {
    this.http.get(this.category_url).subscribe((res: any) => {
      console.log(res.categorys)
      this.category_Data = res.categorys
    })
  }
  ngAfterViewInit() {
    console.log(document.getElementsByClassName('mat-grid-tile-content')[1]);
    this.renderer.removeClass(
      document.getElementsByClassName('mat-grid-tile-content')[1],
      'mat-grid-tile-content'
    );
  }
  searchImage() {
    console.log(this.selected)
    this.searchKeyword = this.selected.categoryName;
    this.noOfImg = this.selected.numberOfImages;
    console.log(this.searchKeyword)
    this.http.get(this.url + (this.noOfImg).toString() + '&query=' + this.searchKeyword).subscribe((res: any) => {
      this.left_Data = [];
      this.bottom_Data = [];
      this.data = res['results'];
      for (var i = 0; i < this.data.length; i++) {
        let imageName = this.searchKeyword + '-' + (i + 1).toString();
        if (i < 10) {
          this.left_Data.push({
            imgName: imageName,
            imgUrl: this.data[i].urls.regular,
          });
        } else {
          this.bottom_Data.push({
            imgName: imageName,
            imgUrl: this.data[i].urls.regular,
          });
        }
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

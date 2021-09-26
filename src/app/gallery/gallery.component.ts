import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  Items:any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getImage().subscribe((resp: any) => {
      this.Items = resp;
      console.log(resp);
    })
  }

}

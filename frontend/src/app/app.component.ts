import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLogin: boolean = false;
  constructor(
    public router: Router,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) {}
  ngOnInit(): void {
    this._MatPaginatorIntl.firstPageLabel = 'première page';
    this._MatPaginatorIntl.itemsPerPageLabel = 'éléments par page :';
    this._MatPaginatorIntl.lastPageLabel = 'dernière page';
    this._MatPaginatorIntl.nextPageLabel = 'page suivante';
    this._MatPaginatorIntl.previousPageLabel = 'page précédente';

    this._MatPaginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 à ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }
  title = 'ticket-app';
}

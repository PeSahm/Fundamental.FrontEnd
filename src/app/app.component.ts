import { Component, OnInit } from '@angular/core';
import { ScreenerService } from './services/screener.service';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ScreenerService]
})
export class AppComponent implements OnInit {
  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  title = '';
  pageTitle = '';
  constructor(

    private service: ScreenerService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.pageTitle = this.route.firstChild?.snapshot.data['title'];
      this.titleService.setTitle(this.pageTitle);


    });
  }




}

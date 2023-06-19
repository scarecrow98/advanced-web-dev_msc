import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { distinctUntilChanged, filter, map, share, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title$ = this.router.events.pipe(
    tap(event => console.log),
    filter(event => event instanceof ChildActivationEnd),
    map((event: any) => event.snapshot.data.title),
    distinctUntilChanged(),
    filter(title => !!title)
  )

  constructor(
    public authService: AuthService,
    private router: Router,
    private messageService: NzMessageService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ '/login' ]);
    this.messageService.success('Logout successful');
  }

}

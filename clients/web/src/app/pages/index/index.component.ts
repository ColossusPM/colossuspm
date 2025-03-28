import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Snowflake } from '@theinternetfolks/snowflake';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  constructor(private router: Router) {}

  createProject() {
    this.router.navigate(['/projects', Snowflake.generate()]);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IApiAdmin } from '../../../models/admin.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-view-profile',
  imports: [HeaderComponent],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent implements OnInit {
  loading: boolean = true;
  public admin?: IApiAdmin;

  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiService);

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._apiService
        .getAdminById(params['id'])
        .subscribe((data: IApiAdmin) => {
          this.admin = data;
          this.loading = false;
        });
    });
  }
}
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "../../../shared/services/toastr.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  id : String;

  constructor(private _Activatedroute:ActivatedRoute,
              private toastrService : ToastrService,
              private _router:Router) { }

  ngOnInit() {
    this.id=this._Activatedroute.snapshot.params['id'];
    this.toastrService.success("Retrieved " + this.id,"");
    // let products=this._productService.getProducts();
    // this.product=products.find(p => p.productID==this.id);
  }

  onBack(): void {
    this._router.navigate(['/product/all-orders']);
  }

}

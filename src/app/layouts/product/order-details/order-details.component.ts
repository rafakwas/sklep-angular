import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "../../../shared/services/toastr.service";
import {OrderProduct} from "../../../shared/models/orderProduct";
import {Order} from "../../../shared/models/order";
import {OrderService} from "../../../shared/services/order.service";
import {Observable} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {first} from "rxjs/internal/operators";


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  id: string;
  orderObservable: Observable<Order>;
  order: Order;
  orderProducts: OrderProduct[];

  constructor(private _Activatedroute: ActivatedRoute,
              private toastrService: ToastrService,
              private orderService: OrderService,
              private productService: ProductService,
              private _router: Router) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.params['id'];
    this.toastrService.success("Retrieved " + this.id, "");
    this.orderObservable = this.orderService.getOrder(this.id);
    this.orderObservable.subscribe(x => {
      this.order = x;
      this.orderProducts = x.products;
    })
  }

  onBack(): void {
    this._router.navigate(['/product/all-orders']);
  }

  completeSingleOrderProduct(orderProduct: OrderProduct) {
    var databaseProduct = this.productService.getProduct(orderProduct.product.id).pipe(first()).toPromise();
    const orderedQuantity = orderProduct.product.quantity;
    console.log("Zamówiona ilość: " + orderedQuantity);
    this.toastrService.success("znaleziono produkt " + databaseProduct.id, databaseProduct.quantity + " vs " + orderedQuantity);
    if (databaseProduct.quantity < orderProduct.product.quantity) {
      this.toastrService.error("Za malo produktów w magazynie!", "");
      return;
    } else {
      this.toastrService.success("Kompletowanie!", "");
      databaseProduct.quantity -= orderedQuantity;
      this.productService.updateProduct(databaseProduct);
      this.orderProducts.filter(x => x.id === orderProduct.id).forEach(x => x.isChecked = true);
      this.order.products = this.orderProducts;
      this.orderService.updateOrder(this.order);
      return;
    }
  };

  // var docRef = this.productService.db.collection("order").doc(orderProduct.product.id);
  // docRef.get().then(function(doc) {
  //   if (doc.exists) {
  //     console.log("Document data:", doc.data());
  //   } else {
  //     doc.data() will be undefined in this case
  // console.log("No such document!");
  // }
  // }).catch(function(error) {
  //   console.log("Error getting document:", error);
  // });
  //

  //
  //

  // });

}

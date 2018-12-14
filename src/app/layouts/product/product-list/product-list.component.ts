import {Component, OnInit} from "@angular/core";
import {Product} from "../../../shared/models/product";
import {ProductService} from "../../../shared/services/product.service";
import {Observable} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Observable<Product[]>;

  categories = ['All', 'INNE'];
  filterByCategory: 'All';
  filterByName: '';
  lowerPriceBound: number;
  upperPriceBound: number;
  page = 1;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private productService: ProductService,
              public authService: AuthService) {}

  ngOnInit() {
    this.productList = this.productService.getProducts();

    this.dropdownList = [
      { item_id: 1, item_text: 'samochody' },
      { item_id: 2, item_text: 'żywność' },
      { item_id: 3, item_text: 'narzędzia' },
      { item_id: 4, item_text: 'rtv' },
      { item_id: 5, item_text: 'agh' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'narzędzia' },
      { item_id: 4, item_text: 'rtv' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Zaznacz wszystkie',
      unSelectAllText: 'Odznacz wszystkie',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}

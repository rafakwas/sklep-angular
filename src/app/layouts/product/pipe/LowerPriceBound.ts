import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "lowerPriceBound"
})
export class LowerPriceBound implements PipeTransform {
  transform(items: any, select?: any): any {
      return select
        ? items.filter(item => item["price"] >= select)
        : items;
  }
}

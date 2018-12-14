import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByCategory"
})
export class FilterByCategory implements PipeTransform {
  transform(items: any, select: any[]): any {
    if (items) {
      select.forEach(select => console.log(select));
      // items.forEach(item => console.log(""+item["category"]+" " + select.indexOf(item["category"])));
      return select
        ? items.filter(item => select.map(x => x.item_text).indexOf(item["category"]) !== -1)
        : items;
    }
  }
}

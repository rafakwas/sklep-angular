import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByCategory"
})
export class FilterByCategory implements PipeTransform {
  transform(items: any, select?: any): any {
    if (select !== "All") {
      return select
        ? items.filter(item => item["category"] === select)
        : items;
    } else {
      return items;
    }
  }
}

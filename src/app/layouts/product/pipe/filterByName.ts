import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByName"
})
export class FilterByName implements PipeTransform {
  transform(items: any, select?: any): any {
    if (select !== "") {
      return select
        ? items.filter(item => item["name"].indexOf(select) != -1)
        : items;
    } else {
      return items;
    }
  }
}

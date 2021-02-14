import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../shared/product.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField: string, keyword: string): any[] {
    if(!filterField || !keyword) {
      return list
    }
    return list.filter(item => {
      return item[filterField].indexOf(keyword) >= 0;
    })
  }

}

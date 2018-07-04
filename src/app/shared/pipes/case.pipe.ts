import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'case'
})
export class CasePipe implements PipeTransform {

  /**
   *
   * @param {string} value
   * @param {string} type : ucfirst (default), up, low
   * @returns {any}
   */
  transform(value: string, type?: string): any {
    if (type == null) {
      type = 'ucfirst';
    }
    switch (type) {
      case 'ucfirst':
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      case 'up':
        return value.toUpperCase();
      case 'low':
        return value.toLocaleLowerCase();
    }
    return value;
  }

}

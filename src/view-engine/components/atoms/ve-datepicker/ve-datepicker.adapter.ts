import {Injectable} from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }
    const {day, month, year} = date;
    return `
      ${day.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}
      ${this.DELIMITER}
      ${month.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}
      ${this.DELIMITER}
      ${year}`.replace(/^\s+|\s+$/gm,'');
  }
}
@Injectable()
export class CustomDateParser extends NgbDateNativeUTCAdapter {
  _fromNativeDate(value: Date): NgbDateStruct | null {
    if (value) {
      return {
        day : value.getDate(),
        month : value.getMonth()+1,
        year : value.getFullYear()
      };
    }
    return null;
  }

  _toNativeDate(date: NgbDateStruct | null): Date {
    if (!date) {
      return new Date();
    }
    const {day, month, year} = date;
    return new Date(year, month-1, day);
  }
}

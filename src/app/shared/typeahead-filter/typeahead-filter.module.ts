import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadFilterComponent } from './typeahead-filter.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SearchOutline} from '@ant-design/icons-angular/icons';



@NgModule({
  declarations: [
    TypeaheadFilterComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule.forChild([
      SearchOutline
    ])
  ],
  exports: [
    TypeaheadFilterComponent
  ]
})
export class TypeaheadFilterModule { }

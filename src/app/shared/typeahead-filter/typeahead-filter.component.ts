import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-typeahead-filter',
  template: `
  <div class="typeahead-filter-component">
    <nz-input-group [nzPrefix]="inputPrefix">
      <input nz-input [placeholder]="placeholder" #input/>
    </nz-input-group>

    <ng-template #inputPrefix>
      <span nz-icon nzType="search" nzTheme="outline"></span>
    </ng-template>
  </div>
  `,
  styles: [
  ]
})
export class TypeaheadFilterComponent implements OnInit, OnDestroy {

  @Input() placeholder: string = '';

  @Input() debounce: number = 500;

  @Output() onFilter = new EventEmitter<string>();

  @ViewChild('input', { static: true, read: ElementRef })
  private inputRef!: ElementRef<HTMLInputElement>;

  private _onDestroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    fromEvent(this.inputRef.nativeElement, 'input').pipe(
      map((event) => (event.target as any).value || ''),
      debounceTime(this.debounce),
      distinctUntilChanged(),
      takeUntil(this._onDestroy$)
    ).subscribe((value) => {
      this.onFilter.emit(value);
    })
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

}

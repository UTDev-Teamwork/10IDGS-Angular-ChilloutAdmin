import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-check',
  templateUrl: './product-check.component.html',
  styleUrls: ['./product-check.component.scss']
})
export class ProductCheckComponent implements OnInit {

  @Input() firstFormGroup: FormGroup;
  @Input() secondFormGroup: FormGroup;
  @Input() thirdFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

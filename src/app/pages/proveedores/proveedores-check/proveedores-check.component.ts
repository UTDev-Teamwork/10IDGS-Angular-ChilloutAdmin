import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proveedores-check',
  templateUrl: './proveedores-check.component.html',
  styleUrls: ['./proveedores-check.component.scss']
})
export class ProveedoresCheckComponent implements OnInit {

  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

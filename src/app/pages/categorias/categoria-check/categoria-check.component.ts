import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categoria-check',
  templateUrl: './categoria-check.component.html',
  styleUrls: ['./categoria-check.component.scss']
})
export class CategoriaCheckComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() categoriaForm: FormGroup;
  @Input() imagen;

}

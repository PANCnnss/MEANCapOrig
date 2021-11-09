import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/types';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: Router
  ) {
    this.buildForm()
  }

  ngOnInit(): void {
  }
  createProduct(event: Event):void{
    event.preventDefault();
    if (this.form.valid) {
      const product:Product = this.form.value
      this.productService.createProduct(product)
      .subscribe((newProduct) => {
        this.route.navigate(['/home'])
      })
    }

  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }
}

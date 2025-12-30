import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/product.model';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      const rawCategories = this.products.map(p => p.category);
      this.categories = ['all', ...new Set(rawCategories)];

      this.route.queryParams.subscribe(params => {
        const catFromUrl = params['category'];

        if (catFromUrl) {
          this.filterByCategory(catFromUrl);
        } else {
          this.filteredProducts = data;
          this.selectedCategory = 'all';
        }
      });
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  onSortChange(event: any) {
    const criteria = event.target.value;
    this.filteredProducts.sort((a, b) => {
      if (criteria === 'default') return a.id - b.id;
      if (criteria === 'priceAsc') return a.price - b.price;
      if (criteria === 'priceDesc') return b.price - a.price;
      if (criteria === 'nameAsc') return a.title.localeCompare(b.title);
      if (criteria === 'nameDesc') return b.title.localeCompare(a.title);
      return 0;
    });
  }
}
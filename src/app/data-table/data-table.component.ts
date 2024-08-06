import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {
  data: User[] = [];
  sortColumn: keyof User = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(response => {
        this.data = response;
        this.sortData();
      });
  }

  sort(column: keyof User) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortData();
  }

 sortData() {
    this.data.sort((a, b) => {
      const valueA = this.getValue(a, this.sortColumn);
      const valueB = this.getValue(b, this.sortColumn);
      
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getValue(user: User, column: keyof User): any {
    if (column === 'address') return user.address.city.toLowerCase();
    if (column === 'company') return user.company.name.toLowerCase();
    return typeof user[column] === 'string' ? (user[column] as string).toLowerCase() : user[column];
  }

  isColumnActive(column: keyof User): boolean {
    return this.sortColumn === column;
  }

  getSortIcon(column: keyof User): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? '↑' : '↓';
    }
    return '';
  }
}
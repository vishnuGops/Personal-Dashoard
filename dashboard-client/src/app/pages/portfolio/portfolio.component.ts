import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface StockPortfolio {
  id: number;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class PortfolioComponent implements OnInit {
  portfolioData: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPortfolioData();
  }

  fetchPortfolioData(): void {
    this.http.get<any[]>('http://localhost:8080/api/portfolio').subscribe({
      next: (data) => {
        this.portfolioData = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to fetch portfolio data';
        this.loading = false;
        console.error('Error fetching portfolio data:', error);
      },
    });
  }
}

package com.Vishnu.PersonalDashboard.controller;

import com.Vishnu.PersonalDashboard.model.StockPortfolio;
import com.Vishnu.PersonalDashboard.service.StockPortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stockPortfolio")
@CrossOrigin(origins = "*") // Allow frontend to connect
public class StockPortfolioController {
    private final StockPortfolioService stockPortfolioService;

    public StockPortfolioController(StockPortfolioService stockPortfolioService) {
        this.stockPortfolioService = stockPortfolioService;
    }

    @GetMapping
    public List<StockPortfolio> getAllStocks() {
        return stockPortfolioService.getAllStocks();
    }

    @GetMapping("/{symbol}")
    public ResponseEntity<StockPortfolio> getStockBySymbol(@PathVariable String symbol) {
        return stockPortfolioService.getStockBySymbol(symbol)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public StockPortfolio addStock(@RequestBody StockPortfolio stockPortfolio) {
        return stockPortfolioService.saveStock(stockPortfolio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        stockPortfolioService.deleteStock(id);
        return ResponseEntity.noContent().build();
    }
}

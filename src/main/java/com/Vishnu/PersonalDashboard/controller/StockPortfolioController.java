package com.Vishnu.PersonalDashboard.controller;

import com.Vishnu.PersonalDashboard.model.StockPortfolio;
import com.Vishnu.PersonalDashboard.service.StockPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:4200")
public class StockPortfolioController {

    @Autowired
    private StockPortfolioService stockPortfolioService;

    @GetMapping
    public ResponseEntity<List<StockPortfolio>> getAllStocks() {
        return ResponseEntity.ok(stockPortfolioService.getAllStocks());
    }

    @PostMapping
    public ResponseEntity<StockPortfolio> addStock(@RequestBody StockPortfolio stock) {
        return ResponseEntity.ok(stockPortfolioService.saveStock(stock));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        stockPortfolioService.deleteStock(id);
        return ResponseEntity.ok().build();
    }
}

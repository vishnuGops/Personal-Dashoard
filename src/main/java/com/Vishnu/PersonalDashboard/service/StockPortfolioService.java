package com.Vishnu.PersonalDashboard.service;

import com.Vishnu.PersonalDashboard.PersonalDashboardApplication;
import com.Vishnu.PersonalDashboard.model.StockPortfolio;
import com.Vishnu.PersonalDashboard.repository.StockPortfolioRepository;
import org.springframework.stereotype.Service;
import java.util.logging.Logger;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
public class StockPortfolioService {
    private final StockPortfolioRepository stockPortfolioRepository;
    private static final Logger logger = Logger.getLogger(PersonalDashboardApplication.class.getName());

    public StockPortfolioService(StockPortfolioRepository stockPortfolioRepository) {
        this.stockPortfolioRepository = stockPortfolioRepository;
    }

    public List<StockPortfolio> getAllStocks() {
        return stockPortfolioRepository.findAll();
    }

    public Optional<StockPortfolio> getStockBySymbol(String symbol) {
        return stockPortfolioRepository.findByStockSymbol(symbol);
    }

    public StockPortfolio saveStock(StockPortfolio stock) {
        logger.info("Saving stock data into the DB: " + stock);
        stock.setTotalCost(stock.getAvgPrice().multiply(BigDecimal.valueOf(stock.getShares())));
        stock.setTotalValue(stock.getMarketPrice().multiply(BigDecimal.valueOf(stock.getShares())));
        stock.setTotalPL(stock.getTotalValue().subtract(stock.getTotalCost()));
        stock.setTotalPLPercentage(stock.getTotalPL().divide(stock.getTotalCost(), 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100)));
        return stockPortfolioRepository.save(stock);
    }

    public void deleteStock(Long id) {
        stockPortfolioRepository.deleteById(id);
    }
}

package com.Vishnu.PersonalDashboard.service;

import com.Vishnu.PersonalDashboard.PersonalDashboardApplication;
import com.Vishnu.PersonalDashboard.model.StockPortfolio;
import com.Vishnu.PersonalDashboard.repository.StockPortfolioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import java.util.logging.Logger;
import java.io.InputStream;
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

    @PostConstruct
    public void loadStockData() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/stocksData.json");
            List<StockPortfolio> stocks = mapper.readValue(inputStream, new TypeReference<List<StockPortfolio>>() {
            });

            for (StockPortfolio stock : stocks) {
                if (stockPortfolioRepository.findByStockSymbol(stock.getStockSymbol()).isEmpty()) {
                    updateStockData(stock);
                    stockPortfolioRepository.save(stock);
                }
            }
            logger.info("Stock data initialized.");
        } catch (

        Exception e) {
            logger.info("Error loading stock data: " + e.getMessage());
        }
    }

    public List<StockPortfolio> getAllStocks() {
        return stockPortfolioRepository.findAll();
    }

    public Optional<StockPortfolio> getStockBySymbol(String symbol) {
        return stockPortfolioRepository.findByStockSymbol(symbol);
    }

    public void updateStockData(StockPortfolio stock) {
        logger.info("Updating stock data: " + stock);
        stock.setTotalCost(stock.getAvgPrice().multiply(BigDecimal.valueOf(stock.getShares())));
        stock.setTotalValue(stock.getMarketPrice().multiply(BigDecimal.valueOf(stock.getShares())));
        stock.setTotalPL(stock.getTotalValue().subtract(stock.getTotalCost()));
        stock.setTotalPLPercentage(stock.getTotalPL().divide(stock.getTotalCost(), 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100)));
    }

    public void deleteStock(Long id) {
        stockPortfolioRepository.deleteById(id);
    }
}

package com.Vishnu.PersonalDashboard.service;

import com.Vishnu.PersonalDashboard.PersonalDashboardApplication;
import com.Vishnu.PersonalDashboard.model.StockPortfolio;
import com.Vishnu.PersonalDashboard.repository.StockPortfolioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.annotation.PostConstruct;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import java.util.logging.Logger;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class StockPortfolioService {
    private static final Logger logger = Logger.getLogger(PersonalDashboardApplication.class.getName());
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private StockPortfolioRepository stockPortfolioRepository;

    @PostConstruct
    public void loadStockData() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            logger.info("Initializing stock data...");
            InputStream inputStream = getClass().getResourceAsStream("/stocksData.json");
            List<StockPortfolio> stocks = mapper.readValue(inputStream, new TypeReference<List<StockPortfolio>>() {
            });

            for (StockPortfolio stock : stocks) {
                if (stockPortfolioRepository.findByStockSymbol(stock.getStockSymbol()).isEmpty()) {
                    logger.info("Adding stock data for " + stock.getStockSymbol());
                    updateStockData(stock);
                }
            }
            logger.info("Stock data initialized and updated.");
        } catch (Exception e) {
            logger.info("Error loading stock data: " + e.getMessage());
        }
    }

    public List<StockPortfolio> getAllStocks() {
        List<StockPortfolio> stocks = stockPortfolioRepository.findAll();
        for (StockPortfolio stock : stocks) {
            updateStockData(stock);
        }
        return stocks;
    }

    public Optional<StockPortfolio> getStockBySymbol(String symbol) {
        return stockPortfolioRepository.findByStockSymbol(symbol);
    }

    public void updateStockData(StockPortfolio stock) {
        try {
            logger.info("Updating stock data: " + stock.getStockName());
            stock.setMarketPrice(getRealTimeMarketPriceOfStock(stock.getStockSymbol()));
            logger.info("Current stock price of " + stock.getStockSymbol() + " is " + stock.getMarketPrice());
            stock.setTotalCost(stock.getAvgPrice().multiply(BigDecimal.valueOf(stock.getShares())));
            stock.setTotalValue(stock.getMarketPrice().multiply(BigDecimal.valueOf(stock.getShares())));
            stock.setTotalPL(stock.getTotalValue().subtract(stock.getTotalCost()));
            stock.setTotalPLPercentage(stock.getTotalPL().divide(stock.getTotalCost(), 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100)));
        } catch (Exception e) {
            logger.severe("Error updating stock data for " + stock.getStockSymbol() + ": " + e.getMessage());
        }
        stockPortfolioRepository.save(stock);
    }

    public BigDecimal getRealTimeMarketPriceOfStock(String symbol) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol=" + symbol))
                .header("x-rapidapi-key",
                        "5ff030a4b0msh17f486a81f3d5a7p1581e4jsn2ff77d18c6a2")
                .header("x-rapidapi-host", "yahoo-finance166.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        try {
            HttpResponse<String> response = HttpClient.newHttpClient().send(request,
                    HttpResponse.BodyHandlers.ofString());

            String responseBody = response.body();

            // Parse JSON response using Jackson
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);

            // Navigate to "regularMarketPrice.raw"
            JsonNode priceNode = rootNode.path("quoteSummary").path("result").get(0).path("price")
                    .path("regularMarketPrice").path("raw");

            // Convert to BigDecimal and return
            if (!priceNode.isMissingNode()) {
                return BigDecimal.valueOf(priceNode.asDouble());
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        return BigDecimal.valueOf(100);
    }

    public void deleteStock(Long id) {
        stockPortfolioRepository.deleteById(id);
    }

    public StockPortfolio saveStock(StockPortfolio stock) {
        updateStockData(stock);
        return stockPortfolioRepository.save(stock);
    }
}

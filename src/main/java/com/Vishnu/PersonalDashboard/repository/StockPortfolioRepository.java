package com.Vishnu.PersonalDashboard.repository;

import com.Vishnu.PersonalDashboard.model.StockPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StockPortfolioRepository extends JpaRepository<StockPortfolio, Long> {
    Optional<StockPortfolio> findByStockSymbol(String stockSymbol);
}

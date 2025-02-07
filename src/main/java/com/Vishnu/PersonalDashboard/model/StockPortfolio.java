package com.Vishnu.PersonalDashboard.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stockPortfolio")
public class StockPortfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String stockName;

    @Column(nullable = false, unique = true)
    private String stockSymbol;

    @Column(nullable = false)
    private BigDecimal avgPrice;

    @Column(nullable = false)
    private int shares;

    @Column(nullable = false)
    private BigDecimal marketPrice;

    @Column(nullable = false)
    private BigDecimal totalCost;

    @Column(nullable = false)
    private BigDecimal totalValue;

    @Column(nullable = false)
    private BigDecimal totalPL;

    @Column(nullable = false)
    private BigDecimal totalPLPercentage;
}

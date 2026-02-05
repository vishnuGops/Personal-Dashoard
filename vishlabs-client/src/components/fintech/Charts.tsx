import React, { useState } from "react";
import dynamic from 'next/dynamic';
import styles from "./Charts.module.scss";
import { stockTickers } from "../../data/stocks";

const TradingViewWidget = dynamic(() => import("./TradingViewWidget"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", width: "100%", background: "#1e1e1e" }} />,
});

const Charts = () => {
  const [interval, setInterval] = useState("D");

  const intervals = [
    { label: "5M", value: "5" },
    { label: "1H", value: "60" },
    { label: "1D", value: "D" },
    { label: "1W", value: "W" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Portfolio Charts</h2>

      <div className={styles.controls}>
        <span className={styles.controlsLabel}>Interval:</span>
        {intervals.map((item) => (
          <button
            key={item.value}
            className={`${styles.button} ${interval === item.value ? styles.active : ""}`}
            onClick={() => setInterval(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {stockTickers.map((ticker) => (
          <div key={ticker.symbol} className={styles.chartWrapper}>
            <div className={styles.chartHeader}>
              <h3>{ticker.name}</h3>
            </div>
            <TradingViewWidget symbol={ticker.symbol} interval={interval} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;

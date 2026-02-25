"use client";
import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  interval: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol,
  interval,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear previous widget/script to allow re-initialization on symbol change
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: "Etc/PDT",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: false,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      hide_volume: true,
      extended_hours: true,
      support_host: "https://www.tradingview.com",
    });

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.height = "100%";
    widgetContainer.style.width = "100%";

    container.current.appendChild(widgetContainer);
    container.current.appendChild(script);
  }, [symbol, interval]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "400px", width: "100%" }}
    ></div>
  );
};

export default memo(TradingViewWidget);

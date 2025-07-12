import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";

const CryptoDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [livePrice, setLivePrice] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error("Error fetching crypto data:", err));
  }, []);

  // Update live price every 10 seconds for selected coin
  useEffect(() => {
    let interval;
    if (selectedCoin) {
      const fetchLivePrice = () => {
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin.id}&vs_currencies=usd`)
          .then(res => res.json())
          .then(data => {
            const price = data[selectedCoin.id].usd;
            setLivePrice(price);
            
            // Add new price point to chart
            const now = new Date();
            setPriceHistory(prev => [
              ...prev, 
              { 
                timestamp: now.toLocaleTimeString(), 
                price: price
              }
            ]);
          })
          .catch(err => console.error("Error fetching live price:", err));
      };

      // Get price history
      setLoading(true);
      fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=usd&days=1`)
        .then(res => res.json())
        .then(data => {
          // Format the history data for the chart
          const formattedHistory = data.prices.map(item => {
            const date = new Date(item[0]);
            return {
              timestamp: date.toLocaleTimeString(),
              price: item[1]
            };
          });
          setPriceHistory(formattedHistory);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching price history:", err);
          setLoading(false);
        });

      fetchLivePrice(); // Initial fetch
      interval = setInterval(fetchLivePrice, 10000); // Poll every 10s
    }

    return () => clearInterval(interval);
  }, [selectedCoin]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🚀 Crypto Dashboard</h1>

      <input
        type="text"
        placeholder="Search cryptocurrency..."
        className="search-input"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-container">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price (USD)</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins
              .filter((coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((coin) => (
                <tr
                  key={coin.id}
                  className="crypto-row"
                  onClick={() => {
                    setSelectedCoin(coin);
                    setLivePrice(coin.current_price);
                    setPriceHistory([]); // Reset history for new coin
                  }}
                >
                  <td className="coin-info">
                    <img src={coin.image} alt={coin.name} className="coin-image" />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal with Chart */}
      {selectedCoin && (
        <div className="modal-overlay" onClick={() => setSelectedCoin(null)}>
          <div className="modal modal-with-chart" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedCoin(null)}>&times;</span>
            <div className="modal-content">
              <div className="modal-header">
                <img src={selectedCoin.image} alt={selectedCoin.name} className="modal-coin-image" />
                <h2>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</h2>
              </div>
              
              <div className="price-chart-container">
                <h3>Price Chart (24h)</h3>
                {loading ? (
                  <div className="chart-loading">Loading chart data...</div>
                ) : priceHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fill: '#aaa', fontSize: 12 }}
                        interval="preserveStartEnd"
                        minTickGap={50}
                      />
                      <YAxis 
                        domain={['auto', 'auto']}
                        tick={{ fill: '#aaa', fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
                        labelFormatter={(label) => `Time: ${label}`}
                        contentStyle={{ background: '#1e1e2f', border: '1px solid #333', borderRadius: '4px' }}
                        itemStyle={{ color: '#00ff88' }}
                        labelStyle={{ color: '#ffffff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#00ff88" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="chart-loading">No price data available</div>
                )}
              </div>

              <div className="coin-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <p className="detail-label">Live Price:</p>
                    <p className="detail-value price-value">${livePrice?.toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">24h Change:</p>
                    <p className={`detail-value ${selectedCoin.price_change_percentage_24h >= 0 ? "green" : "red"}`}>
                      {selectedCoin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-item">
                    <p className="detail-label">24h High:</p>
                    <p className="detail-value">${selectedCoin.high_24h.toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">24h Low:</p>
                    <p className="detail-value">${selectedCoin.low_24h.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-item">
                    <p className="detail-label">Market Cap:</p>
                    <p className="detail-value">${selectedCoin.market_cap.toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">Total Volume:</p>
                    <p className="detail-value">${selectedCoin.total_volume.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-item">
                    <p className="detail-label">Circulating Supply:</p>
                    <p className="detail-value">{selectedCoin.circulating_supply.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoDashboard;
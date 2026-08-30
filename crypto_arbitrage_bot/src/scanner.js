import ccxt from 'ccxt';

export class ArbitrageScanner {
    constructor() {
        // Inicializa as exchanges públicas sem precisar de chaves privadas para monitoramento de dados
        this.exchanges = {
            binance: new ccxt.binance({ enableRateLimit: true }),
            bybit: new ccxt.bybit({ enableRateLimit: true }),
            kraken: new ccxt.kraken({ enableRateLimit: true }),
            coinbase: new ccxt.coinbase({ enableRateLimit: true }),
            kucoin: new ccxt.kucoin({ enableRateLimit: true })
        };

        this.symbols = [
            'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 
            'BNB/USDT', 'XRP/USDT', 'DOGE/USDT', 
            'ADA/USDT', 'AVAX/USDT', 'LINK/USDT'
        ];

        this.latestPrices = {};
        this.opportunities = [];
        this.feeRate = 0.001; // 0.1% fee por transação (taker padrão)
    }

    async fetchPrices() {
        const timestamp = new Date().toISOString();
        const priceMap = {};

        const fetchPromises = Object.entries(this.exchanges).map(async ([exchangeName, exchange]) => {
            try {
                const tickers = await exchange.fetchTickers(this.symbols);
                for (const [symbol, ticker] of Object.entries(tickers)) {
                    if (ticker && ticker.bid && ticker.ask) {
                        if (!priceMap[symbol]) priceMap[symbol] = {};
                        priceMap[symbol][exchangeName] = {
                            bid: ticker.bid, // Preço de venda
                            ask: ticker.ask, // Preço de compra
                            last: ticker.last || (ticker.bid + ticker.ask) / 2,
                            timestamp: ticker.timestamp || Date.now()
                        };
                    }
                }
            } catch (err) {
                // Silently fallback if an exchange rate limits
            }
        });

        await Promise.allSettled(fetchPromises);
        this.latestPrices = priceMap;
        this.findCrossExchangeOpportunities();
        return { timestamp, prices: this.latestPrices, opportunities: this.opportunities };
    }

    findCrossExchangeOpportunities() {
        const found = [];

        for (const [symbol, exchangeData] of Object.entries(this.latestPrices)) {
            const exchangeNames = Object.keys(exchangeData);
            if (exchangeNames.length < 2) continue;

            for (let i = 0; i < exchangeNames.length; i++) {
                for (let j = 0; j < exchangeNames.length; j++) {
                    if (i === j) continue;

                    const buyExchange = exchangeNames[i];
                    const sellExchange = exchangeNames[j];

                    const buyPrice = exchangeData[buyExchange].ask; // Preço mais barato para comprar
                    const sellPrice = exchangeData[sellExchange].bid; // Preço mais caro para vender

                    if (buyPrice > 0 && sellPrice > 0) {
                        const grossSpread = ((sellPrice - buyPrice) / buyPrice) * 100;
                        const netSpread = grossSpread - (this.feeRate * 2 * 100); // Deduz taxas de compra e venda

                        // Registra se o spread bruto for positivo
                        if (grossSpread > 0.05) {
                            found.push({
                                id: `${symbol}-${buyExchange}-${sellExchange}-${Date.now()}`,
                                symbol,
                                buyExchange: buyExchange.toUpperCase(),
                                buyPrice,
                                sellExchange: sellExchange.toUpperCase(),
                                sellPrice,
                                grossSpread: parseFloat(grossSpread.toFixed(4)),
                                netSpread: parseFloat(netSpread.toFixed(4)),
                                isProfitable: netSpread > 0,
                                timestamp: new Date().toLocaleTimeString('pt-BR')
                            });
                        }
                    }
                }
            }
        }

        // Ordena pela maior oportunidade líquida
        found.sort((a, b) => b.netSpread - a.netSpread);
        this.opportunities = found.slice(0, 15);
    }
}

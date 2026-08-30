export class PaperTradingEngine {
    constructor(initialBalanceUSDT = 1000) {
        this.initialBalance = initialBalanceUSDT;
        this.currentBalance = initialBalanceUSDT;
        this.trades = [];
        this.totalProfit = 0;
        this.winCount = 0;
        this.lossCount = 0;
    }

    executeArbitrage(opportunity, tradeSizeUSDT = 100) {
        if (this.currentBalance < tradeSizeUSDT) {
            return { success: false, reason: 'Saldo insuficiente' };
        }

        const buyPrice = opportunity.buyPrice;
        const sellPrice = opportunity.sellPrice;
        const coinAmount = tradeSizeUSDT / buyPrice;

        const feeBuy = tradeSizeUSDT * 0.001; // 0.1% fee
        const grossReturn = coinAmount * sellPrice;
        const feeSell = grossReturn * 0.001; // 0.1% fee

        const netProfit = grossReturn - tradeSizeUSDT - (feeBuy + feeSell);
        const profitPercent = (netProfit / tradeSizeUSDT) * 100;

        this.currentBalance += netProfit;
        this.totalProfit += netProfit;

        if (netProfit > 0) this.winCount++;
        else this.lossCount++;

        const tradeRecord = {
            id: `TRADE-${Date.now()}-${Math.floor(Math.random()*1000)}`,
            timestamp: new Date().toLocaleTimeString('pt-BR'),
            symbol: opportunity.symbol,
            buyExchange: opportunity.buyExchange,
            sellExchange: opportunity.sellExchange,
            buyPrice,
            sellPrice,
            tradeSize: tradeSizeUSDT,
            netProfit: parseFloat(netProfit.toFixed(4)),
            profitPercent: parseFloat(profitPercent.toFixed(4)),
            newBalance: parseFloat(this.currentBalance.toFixed(2))
        };

        this.trades.unshift(tradeRecord);
        if (this.trades.length > 50) this.trades.pop();

        return { success: true, trade: tradeRecord };
    }

    getStats() {
        return {
            initialBalance: this.initialBalance,
            currentBalance: parseFloat(this.currentBalance.toFixed(2)),
            totalProfit: parseFloat(this.totalProfit.toFixed(2)),
            totalTrades: this.trades.length,
            winRate: this.trades.length > 0 
                ? parseFloat(((this.winCount / (this.winCount + this.lossCount)) * 100).toFixed(1)) 
                : 0,
            recentTrades: this.trades.slice(0, 10)
        };
    }
}

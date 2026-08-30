import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArbitrageScanner } from './scanner.js';
import { PaperTradingEngine } from './paper_trader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3033;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const scanner = new ArbitrageScanner();
const paperTrader = new PaperTradingEngine(1000); // Começa com $1,000 USDT virtual

// Rota de status da API
app.get('/api/stats', (req, res) => {
    res.json({
        stats: paperTrader.getStats(),
        latestOpportunities: scanner.opportunities,
        prices: scanner.latestPrices
    });
});

// Rota para simular execução manual de uma oportunidade
app.post('/api/trade', (req, res) => {
    const { opportunity, tradeSize } = req.body;
    if (!opportunity) return res.status(400).json({ error: 'Oportunidade inválida' });

    const result = paperTrader.executeArbitrage(opportunity, tradeSize || 100);
    broadcastState();
    res.json(result);
});

// Auto-Trading Bot toggle
let autoTradingEnabled = false;
app.post('/api/toggle-auto', (req, res) => {
    autoTradingEnabled = !autoTradingEnabled;
    res.json({ autoTradingEnabled });
});

function broadcastState() {
    const payload = JSON.stringify({
        type: 'UPDATE',
        stats: paperTrader.getStats(),
        opportunities: scanner.opportunities,
        prices: scanner.latestPrices,
        autoTradingEnabled
    });

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
}

// Loop principal de varredura de mercado em tempo real (a cada 3 segundos)
async function startScanLoop() {
    console.log('🚀 Iniciando Scanner de Arbitragem em Tempo Real...');
    
    setInterval(async () => {
        try {
            await scanner.fetchPrices();

            // Se o auto-trading estiver ligado, executa a melhor oportunidade lucrativa automaticamente
            if (autoTradingEnabled && scanner.opportunities.length > 0) {
                const bestOpp = scanner.opportunities[0];
                if (bestOpp.isProfitable && bestOpp.netSpread > 0.1) {
                    const res = paperTrader.executeArbitrage(bestOpp, 100);
                    if (res.success) {
                        console.log(`🤖 Auto-Trade Executado: ${bestOpp.symbol} +$${res.trade.netProfit} (${res.trade.profitPercent}%)`);
                    }
                }
            }

            broadcastState();
        } catch (err) {
            console.error('Erro no loop de scan:', err.message);
        }
    }, 3000);
}

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({
        type: 'INIT',
        stats: paperTrader.getStats(),
        opportunities: scanner.opportunities,
        prices: scanner.latestPrices,
        autoTradingEnabled
    }));
});

server.listen(PORT, () => {
    console.log(`⚡ Crypto Arbitrage Engine rodando em: http://localhost:${PORT}`);
    startScanLoop();
});

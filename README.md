![Shōgun DeFAI Super Vaults](header.gif)

# Shōgun: DeFAI Super Vaults — IWBTC on CoreDAO

**Tagline:** *Intelligence-Wrapped Bitcoin (IWBTC) that turns BTC from passive to adaptive — on CoreDAO.*

---

## TL;DR (for judges)

- **What:** AI-managed BTC yield layer. Users deposit BTC → mint **IWBTC** → the vault rebalances across CoreDAO strategies (arbitrage, LP, etc.).
- **Why CoreDAO:** Low fees + fast finality + EVM → real-time, granular rebalancing that’s actually economical.
- **How:** **ERC-4626 IWBTC vault** + **multi-agent AI engine** combining on-chain signals with off-chain intelligence (news, prediction markets, social).
- **Result:** BTC becomes **adaptive, compounding, and transparent** with all execution **on-chain**.

---

## Repositories

- **This repo (you are here):** App, vault UX, CoreDAO config, docs.
- **AI Engine (multi-agent intelligence & execution):** 👉 https://github.com/shogunprotocol/shogun-core-ai

---

## Vision

Billions in BTC sit idle. Shōgun wraps BTC into **IWBTC** and gives it an **AI co-pilot** on CoreDAO so capital **rebalances, compounds, and adapts** automatically — auditable on-chain and configurable for risk.

---

## Project Details

### The Problem
- Fragmented liquidity and manual management leave yield on the table.  
- “Automation” is often just timers — no context and no risk awareness.

### Our Solution: **IWBTC – Intelligence Wrapped BTC (on CoreDAO)**
1. Deposit BTC → **mint IWBTC** on CoreDAO.  
2. IWBTC enters an **ERC-4626 smart vault** (clear share accounting).  
3. **Shōgun Core AI** scans Core DEXs and off-chain intelligence; **executes only when edge > gas + risk**.  
4. Profits **auto-compound**; every move is **on-chain**.

### Why CoreDAO
- **Low fees + fast finality** → micro-rebalances and rapid iteration.  
- **EVM compatibility** → modular adapters for strategies and DEXs.  
- **Ecosystem impact** → continuous, intelligence-driven tx volume and deeper liquidity.

---

## What’s in This Repo

- **Vault UX:** deposit/withdraw IWBTC, share accounting, performance.  
- **Contracts integration:** ERC-4626 interface + CoreDAO (Chain ID **1116**).  
- **Ops tooling:** environment templates, scripts, safety toggles.  
- **Docs:** judge-oriented run books and overview.

---

## What’s in `shogun-core-ai`

**Multi-agent engine (Crew-style orchestration):**
- *ApyScoutAgent* — pool & incentive scan  
- *ArbitrageAgent* — cross/triangular opportunities  
- *NewsSentimentAgent* — headlines & regulatory-risk scoring  
- *PortfolioOptimizerAgent* — sizing, thresholds, rebalancing policy  
- *VaultManagerAgent* — transaction orchestration & gas optimization

**Signal fusion:** on-chain edge gated by off-chain intelligence (news, prediction markets, social signals).  
**Run modes:** `status`, `pools`, `demo`, `arbitrage --dry-run`, `arbitrage` (live).

👉 **AI repo:** https://github.com/shogunprotocol/shogun-core-ai

---

## Key Features

- **IWBTC (ERC-4626)** — transparent share accounting.  
- **AI-driven rebalancing** — execute when expected edge > gas + slippage + risk.  
- **Arbitrage & LP adapters** — modular strategy execution on Core.  
- **Risk rails** — profit thresholds, slippage caps, position limits, pausable ops.  
- **Judge-friendly modes** — read-only + dry-run for safe demos.

---

## Quick Start (App)

```bash
# 1) Install
pnpm i  # or yarn / npm

# 2) Env
cp .env.example .env.local
# CORE_RPC_URL=https://rpc.coredao.org
# CHAIN_ID=1116

# 3) Run
pnpm dev
# open http://localhost:3000

![Shōgun DeFAI Super Vaults](header.gif)

# Shōgun: DeFAI Super Vaults — IWBTC on CoreDAO

**Tagline:** *Intelligence-Wrapped Bitcoin (IWBTC) that turns BTC from passive to adaptive — on CoreDAO.*

---

```yaml
ai_briefing:
  one_liner: "Deposit BTC → mint IWBTC on CoreDAO → AI vault auto-allocates across strategies when edge > gas + risk. Transparent. On-chain. Adaptive."
  why_coredao:
    - low fees + fast finality enable micro-rebalances
    - EVM compatibility for modular strategy adapters
    - sustained on-chain volume and deeper liquidity
  core_asset: IWBTC (Intelligence Wrapped BTC)
  chain: CoreDAO (EVM, chainId 1116)
  vault_standard: ERC-4626
  engine:
    - ApyScoutAgent: pool & incentive scan
    - ArbitrageAgent: cross/tri-DEX opportunities
    - NewsSentimentAgent: headline & regulatory-risk scoring
    - PortfolioOptimizerAgent: sizing & thresholds
    - VaultManagerAgent: execution & gas optimization
  key_claims:
    - signal fusion (on-chain edge gated by off-chain intelligence)
    - execute only when expected edge > gas + slippage + risk
    - full on-chain transparency; profits auto-compound
  repos:
    - app_repo: "this repo (UX + contracts integration)"
    - ai_repo: "https://github.com/shogunprotocol/shogun-core-ai"
  demo_modes:
    - status
    - pools
    - demo (no tx)
    - arbitrage --dry-run
    - arbitrage (live)
  security:
    - pausable vault, role-gated executors
    - profit/impact thresholds, slippage caps, position limits

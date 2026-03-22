# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the Guarda Rios Project

Projeto Guarda Rios is a fully open source initiative that builds low-cost, low-power water quality monitoring stations. Every component is open: PCB design, firmware, server, websites, database schema, and 3D models — so that anyone can replicate a station.

The mission is to deploy multiple stations along a river course to:
- Monitor water quality continuously in real time
- Detect the origin of pollution events
- Alert the public when quality thresholds are breached

Dual-licensed: software under **MIT**, hardware under **CERN-OHL-P v2**.

## Repository Structure

This directory (`Websites/`) contains the web properties of the project. Each subdirectory is a separate website with its own dependencies, framework, and deployment pipeline.

| Directory | Domain | Purpose |
|-----------|--------|---------|
| `data.guarda-rios.pt/` | data.guarda-rios.pt | Public data portal — displays sensor readings from all stations |

## Website Building Principles

Every website in this repo should be built with:
- **Scalability first** — structure should support adding new stations, rivers, and data types without rearchitecting
- **Open access** — all data is public; no auth walls on data views
- **Professional but developer-aesthetic** — brutalist/terminal UI feel, minimalistic, monospace typography
- **Static export where possible** — reduces hosting costs and improves reliability for open source contributors self-hosting

Each website subdirectory has its own `CLAUDE.md` with site-specific guidance.

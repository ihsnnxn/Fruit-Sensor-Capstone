# Fruit Sensor Capstone

This repository contains the prototype code and documentation for the Capstone project:
*Sensor Monitoring System to Prolong Fruit Shelf Life*.

Folders:
- `firmware/` - nRF9160 firmware skeleton and pseudocode
- `dashboard/` - React dashboard (UI mockup)
- `backend/` - Node.js MQTT proxy and REST API
- `ml/` - ML training starter script & dataset guidance
- `docs/` - diagrams, payload examples, datasheet links

> >  NOTE: Do **not** commit large datasets or private keys. This repo includes example files and skeleton code to demonstrate architecture.

## Quick start (local)

1. Backend (REST + MQTT proxy)
```bash
cd backend
npm install
node index.js

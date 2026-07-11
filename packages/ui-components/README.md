# OHINO UI Components

Minimal, reusable React UI components for OHINO-S. These are lightweight building blocks intended to be used by modules and the core app.

Design goals:
- Minimal and production-ready
- Unopinionated styling (small CSS helpers)
- No direct coupling to AI providers or storage; components accept props/services

Components included:
- ModuleShell
- Button
- Card
- ProfileEditor (local-only UI, expects a save handler)
- ChatView and MessageItem (chat primitives; accept onSend prop)

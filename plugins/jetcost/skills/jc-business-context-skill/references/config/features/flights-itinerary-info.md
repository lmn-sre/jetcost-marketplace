---
type: Feature Flag
description: "Display warnings and context on flight cards and detail views for baggage, airport changes, and connection risks."
tags: [feature]
timestamp: 2026-07-22T00:00:00Z
---

# FLIGHTS-ITINERARY-INFO

Controls which additional information is displayed on flight result cards and in the detail view. The `CARD-*` configs affect the inline result row; the `DETAIL-*` configs affect the expanded detail view. The goal is to surface relevant warnings and context (baggage, airport changes, VI status) to set correct user expectations before the click, improving traffic quality especially on CPA markets.

## Configs

### ENABLED
Enables or disables the feature entirely.

### CARD-SHOW-BAGGAGES
Shows baggage information (included / paid / not available) on the result card.

### CARD-SHOW-BEST-ITINERARIES
<!-- TODO: describe what this config controls -->

### CARD-SHOW-MISMATCHED-AIRPORTS
Shows a warning on the card when the arrival airport of one segment does not match the departure airport of the next (e.g. arriving at FCO, departing from CIA).

### CARD-SHOW-STOPOVER-AIRPORT-CHANGES
Shows a warning on the card when a stopover involves a change of airport.

### CARD-SHOW-VI-INFO
Shows a Virtual Interline indicator on the card, signalling that the itinerary consists of separate tickets and the passenger bears the connection risk. See [core/product/flights.md](/core/product/flights.md).

### DETAIL-SHOW-ARRIVAL-NEXT-DAY
Shows a warning in the detail view when the arrival is on the day after departure.

### DETAIL-SHOW-BAGGAGES
Shows baggage information in the detail view.

### DETAIL-SHOW-MISMATCHED-AIRPORTS
Shows a mismatched airport warning in the detail view.

### DETAIL-SHOW-OVERNIGHT-FLIGHTS
Shows a warning in the detail view for overnight flights.

### DETAIL-SHOW-STOPOVER-AIRPORT-CHANGES
Shows a warning in the detail view when a stopover involves a change of airport.

### DETAIL-SHOW-STOPOVER-DURATIONS
Shows the duration of each stopover in the detail view.

### DETAIL-SHOW-VI-INFO
Shows Virtual Interline information in the detail view.

### SHOW-UNDEFINED-BAGGAGES
<!-- TODO: describe what this config controls -->

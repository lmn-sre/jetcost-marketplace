# MAL — Meta Advertising Layer

## Overview

MAL is the commercial tool that manages the relationship with partners
and the integrations built on it: the standard core integration, the
sponsored MAL Core placements, the MAL Media slots, and the
integrations with the external demand networks. It lives under
`core/commercials/` for that reason — the display-advertising side of
the business (banners) is [core/media/](/core/media/index.md).

Its revenue lands in two different buckets depending on where a
placement sits: MAL Core inside the search funnel counts as Core,
MAL Media outside it counts as Media.

## Files

- [overview.md](/core/commercials/mal/overview.md) - what MAL is, and the MAL Core / MAL Media split with the accounting consequence of each
- [networks.md](/core/commercials/mal/networks.md) - the two integration levels: the few networks that supply the demand (one of them internal, `MDFLOW`) and the many partners that actually buy the click and own the landing domain
- [self-trailingtab.md](/core/commercials/mal/self-trailingtab.md) - the white-label trailing tab selling its click to Jetcost itself: revenue for the white label, acquisition cost for Jetcost

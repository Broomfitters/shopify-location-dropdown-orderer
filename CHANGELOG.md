# Changelog

All notable changes to the Shopify Location Dropdown Orderer extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-11-20

### Fixed
- Fixed infinite loop causing Chrome to hang when opening location dropdowns
- Observer now disconnects before reordering and reconnects after to prevent triggering itself

## [1.0.1] - 2025-11-14

### Fixed
- Fixed issue where Origin/Destination dropdowns on the transfer screen only worked after the second open
- Added per-listbox observers to handle lazy-loaded dropdown items that are populated after the container appears

## [1.0.0] - 2025-10-23

### Added
- Initial release of Shopify Location Dropdown Orderer
- Automatic reordering of location dropdown to show store locations before app locations
- MutationObserver to detect and reorder dropdowns dynamically
- Polaris design system divider between store locations and app locations
- Icon generator HTML tool for creating extension icons
- Support for both admin.shopify.com and *.myshopify.com/admin URLs

### Features
- Reorders location dropdown with the following structure:
  1. "All locations" option (always first)
  2. Store locations (e.g., physical stores)
  3. Visual divider line
  4. App-based fulfillment locations (e.g., Printful, Printify, etc.)
- Uses Polaris design tokens for consistent styling with Shopify admin
- Zero data collection - runs entirely locally
- No external network requests

[1.0.0]: https://github.com/yourusername/shopify-location-dropdown-orderer/releases/tag/v1.0.0

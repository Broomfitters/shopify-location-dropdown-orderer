/**
 * Shopify Location Dropdown Orderer
 * Reorders location dropdown to show actual store locations before app locations
 */

(function() {
  'use strict';

  // Function to check if an element is an app location (has "App" badge)
  function isAppLocation(listItem) {
    const badge = listItem.querySelector('s-internal-badge');
    if (!badge) return false;

    // Check if badge contains "App" text
    const badgeText = badge.textContent || badge.innerText;
    return badgeText.trim().toLowerCase() === 'app';
  }

  // Function to check if an element is the "All locations" option
  function isAllLocationsOption(listItem) {
    const value = listItem.getAttribute('data-listbox-option-value');
    return value === 'MULTILOCATION_ALL_LOCATIONS_KEY';
  }

  // Function to reorder the listbox items
  function reorderLocations(listbox) {
    const items = Array.from(listbox.children);

    if (items.length === 0) return;

    // Separate items into categories
    const allLocationsItem = items.find(item => isAllLocationsOption(item));
    const storeLocations = items.filter(item =>
      !isAllLocationsOption(item) && !isAppLocation(item)
    );
    const appLocations = items.filter(item =>
      !isAllLocationsOption(item) && isAppLocation(item)
    );

    // Reorder: All locations -> Store locations -> App locations
    const orderedItems = [
      allLocationsItem,
      ...storeLocations,
      ...appLocations
    ].filter(Boolean); // Remove any undefined items

    // Only reorder if the order is different
    const currentOrder = items.map(item => item.getAttribute('id')).join(',');
    const newOrder = orderedItems.map(item => item.getAttribute('id')).join(',');

    if (currentOrder !== newOrder) {
      // Remove all items
      items.forEach(item => item.remove());

      // Re-append in the correct order
      orderedItems.forEach(item => listbox.appendChild(item));

      console.log('Shopify Location Dropdown Orderer: Reordered locations');
    }
  }

  // Function to find and reorder listboxes
  function processListboxes() {
    const listboxes = document.querySelectorAll('ul.Polaris-Listbox[aria-label*="Locations"]');
    listboxes.forEach(listbox => {
      reorderLocations(listbox);
    });
  }

  // Create a MutationObserver to watch for dropdown appearing
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        // Check if any added nodes contain or are a Polaris-Listbox
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the node itself is a listbox
            if (node.matches && node.matches('ul.Polaris-Listbox[aria-label*="Locations"]')) {
              reorderLocations(node);
            }
            // Check if the node contains a listbox
            else if (node.querySelector) {
              const listboxes = node.querySelectorAll('ul.Polaris-Listbox[aria-label*="Locations"]');
              listboxes.forEach(listbox => reorderLocations(listbox));
            }
          }
        });
      }
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Also process any existing listboxes on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processListboxes);
  } else {
    processListboxes();
  }

  console.log('Shopify Location Dropdown Orderer: Extension loaded');
})();

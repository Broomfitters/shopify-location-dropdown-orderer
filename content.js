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

  // Function to create a Polaris-style divider
  function createDivider() {
    const divider = document.createElement('li');
    divider.className = 'shopify-location-orderer-divider';
    divider.setAttribute('role', 'separator');
    divider.setAttribute('aria-hidden', 'true');
    divider.style.cssText = `
      padding: 0;
      margin: var(--p-space-200) 0;
      list-style: none;
    `;

    const dividerLine = document.createElement('div');
    dividerLine.className = 'Polaris-Divider';
    dividerLine.style.cssText = `
      border-top: var(--p-border-width-025) solid var(--p-color-border-secondary);
      margin: 0 var(--p-space-400);
    `;

    divider.appendChild(dividerLine);
    return divider;
  }

  // Track which listboxes we're already observing (WeakMap to store observer references)
  const observedListboxes = new WeakMap();

  // Function to reorder the listbox items
  function reorderLocations(listbox) {
    const items = Array.from(listbox.children);

    if (items.length === 0) return;

    // Start observing this listbox for changes to its children (lazy loading)
    if (!observedListboxes.has(listbox)) {
      const listboxObserver = new MutationObserver(() => {
        reorderLocations(listbox);
      });
      observedListboxes.set(listbox, listboxObserver);
      listboxObserver.observe(listbox, {
        childList: true
      });
    }

    // Separate items into categories
    const allLocationsItem = items.find(item => isAllLocationsOption(item));
    const storeLocations = items.filter(item =>
      !isAllLocationsOption(item) && !isAppLocation(item)
    );
    const appLocations = items.filter(item =>
      !isAllLocationsOption(item) && isAppLocation(item)
    );

    // Remove any existing dividers we may have added
    const existingDividers = listbox.querySelectorAll('.shopify-location-orderer-divider');
    existingDividers.forEach(divider => divider.remove());

    // Reorder: All locations -> Store locations -> Divider -> App locations
    const orderedItems = [
      allLocationsItem,
      ...storeLocations
    ].filter(Boolean); // Remove any undefined items

    // Only reorder if the order is different or if we need to add divider
    const currentOrder = items.map(item => item.getAttribute('id')).join(',');
    const newOrder = orderedItems.map(item => item.getAttribute('id')).join(',');

    if (currentOrder !== newOrder || existingDividers.length === 0) {
      // Disconnect observer before making changes to prevent infinite loop
      const observer = observedListboxes.get(listbox);
      if (observer) {
        observer.disconnect();
      }

      // Remove all items
      items.forEach(item => item.remove());

      // Re-append in the correct order
      orderedItems.forEach(item => listbox.appendChild(item));

      // Add divider if we have both store locations and app locations
      if (storeLocations.length > 0 && appLocations.length > 0) {
        listbox.appendChild(createDivider());
      }

      // Append app locations
      appLocations.forEach(item => listbox.appendChild(item));

      console.log('Shopify Location Dropdown Orderer: Reordered locations with divider');

      // Reconnect observer after changes are complete
      if (observer) {
        observer.observe(listbox, {
          childList: true
        });
      }
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

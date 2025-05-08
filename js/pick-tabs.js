document.addEventListener('DOMContentLoaded', function() {
    // Get all tab items and tab content items
    const tabItems = document.querySelectorAll('.pick-tabs-top__item');
    const tabContentItems = document.querySelectorAll('.pick-tab-content-item');
    const brandCells = document.querySelectorAll('.brand-cell');
    const mobileTabItems = document.querySelectorAll('.pick-tab-mobile-item');
    const mobileTabs = document.querySelector('.pick-tabs--mobile');
    
    // Store the selected items and last active tab index
    const selectedItems = {
        brand: null,
        model: null,
        year: null,
        bodyType: null,
        engineSize: null,
        modification: null
    };
    
    let lastActiveTabIndex = 0;
    let currentActiveTabIndex = 0;
    let isContentCollapsed = false;
    
    // Initial setup
    function initializeTabs() {
        // Initially show only first 3 tabs
        tabItems.forEach((tab, index) => {
            if (index > 2) {
                tab.style.display = 'none';
            }
        });
        
        // Initially show first tab content
        activateTab(0);
        
        // Add a class to handle hover state
        tabItems.forEach(tab => {
            tab.classList.add('tab-can-hover');
        });
        
        // Set click events for tabs
        tabItems.forEach((tab, index) => {
            tab.addEventListener('click', function(e) {
                // Only allow clicking on tabs before or equal to the last active tab
                if (index <= lastActiveTabIndex) {
                    // Check if clicking on currently active tab
                    if (index === currentActiveTabIndex) {
                        // Toggle content visibility
                        isContentCollapsed = !isContentCollapsed;
                        
                        if (isContentCollapsed) {
                            // Hide content
                            if (tabContentItems[index]) {
                                tabContentItems[index].style.display = 'none';
                            }
                            
                            // Make arrow red
                            const angle = tab.querySelector('.pick-top__angle');
                            if (angle) {
                                angle.style.background = 'var(--color-red)';
                            }
                        } else {
                            // Show content
                            if (tabContentItems[index]) {
                                tabContentItems[index].style.display = 'grid';
                            }
                            
                            // Reset arrow color
                            const angle = tab.querySelector('.pick-top__angle');
                            if (angle) {
                                angle.style.background = '';
                            }
                            
                            // Ensure active styling
                            updateTabsVisuals();
                        }
                    } else {
                        // Update current active tab
                        currentActiveTabIndex = index;
                        isContentCollapsed = false;
                        activateTab(index);
                    }
                }
            });
        });
        
        // Set click events for mobile tabs
        if (mobileTabItems.length > 0) {
            mobileTabItems.forEach((tab, index) => {
                tab.addEventListener('click', function(e) {
                    // Only allow clicking on tabs before or equal to the last active mobile tab
                    if (index <= lastActiveTabIndex) {
                        const wasActive = tab.classList.contains('active');
                        
                        // Update current active tab for mobile
                        currentActiveTabIndex = index;
                        activateMobileTab(index);
                        
                        // Toggle pick-tab-content-item visibility in mobile view
                        const tabContent = tab.querySelector('.pick-tab-content-item');
                        
                        if (wasActive && tabContent) {
                            // If it was already active, toggle the content
                            if (tabContent.style.maxHeight !== '0px') {
                                tabContent.style.maxHeight = '0px';
                            } else {
                                tabContent.style.maxHeight = tabContent.scrollHeight + 'px';
                            }
                        }
                    }
                });
            });
        }
        
        // Set click events for brand cells
        brandCells.forEach(cell => {
            cell.addEventListener('click', function() {
                // Store the selected value
                const cellText = cell.textContent.trim();
                
                // Find which tab is active
                const activeIndex = currentActiveTabIndex;
                
                // Store the selected item based on the active tab
                switch(activeIndex) {
                    case 0: selectedItems.brand = cellText; break;
                    case 1: selectedItems.model = cellText; break;
                    case 2: selectedItems.year = cellText; break;
                    case 3: selectedItems.bodyType = cellText; break;
                    case 4: selectedItems.engineSize = cellText; break;
                    case 5: selectedItems.modification = cellText; break;
                    default: // Handle any additional tabs
                        console.log(`Selection for tab ${activeIndex}: ${cellText}`);
                        break;
                }
                
                // Highlight the selected cell
                const parent = cell.closest('.pick-tab-content-item');
                if (parent) {
                    // Only clear selection within this tab's content
                    const cellsInTab = parent.querySelectorAll('.brand-cell');
                    cellsInTab.forEach(c => c.classList.remove('active'));
                    cell.classList.add('active');
                } else {
                    // Fallback to clear all if we can't find parent
                    brandCells.forEach(c => c.classList.remove('active'));
                    cell.classList.add('active');
                }
                
                // If we're changing a selection in the current tab, reset all tabs after this one
                const parentTabContent = cell.closest('.pick-tab-content-item');
                if (parentTabContent && currentActiveTabIndex === Array.from(tabContentItems).indexOf(parentTabContent)) {
                    // Hide all tabs after the current one
                    for (let i = activeIndex + 1; i < tabItems.length; i++) {
                        if (i > 2) { // Keep the first 3 tabs always visible
                            tabItems[i].style.display = 'none';
                        }
                    }
                    
                    // Reset lastActiveTabIndex to current tab
                    lastActiveTabIndex = activeIndex;
                }
                
                // Only proceed if we're not on the last tab
                if (activeIndex < tabItems.length - 1) {
                    // Update the last active tab index
                    lastActiveTabIndex = Math.max(lastActiveTabIndex, activeIndex + 1);
                    
                    // Show the next tab
                    tabItems[activeIndex + 1].style.display = 'flex';
                    
                    // Update current active tab to the next one
                    currentActiveTabIndex = activeIndex + 1;
                    
                    // Reset the collapsed state
                    isContentCollapsed = false;
                    
                    // Activate next tab
                    activateTab(currentActiveTabIndex);
                    
                    // If mobile tabs exist, also activate the next mobile tab
                    if (mobileTabItems.length > 0 && window.innerWidth <= 1024) {
                        const activeMobileIndex = Array.from(mobileTabItems).findIndex(t => t.classList.contains('active'));
                        
                        // If we're on the mobile view and there's a next tab
                        if (activeMobileIndex < mobileTabItems.length - 1) {
                            // Close current mobile tab content
                            const currentMobileTab = mobileTabItems[activeMobileIndex];
                            const currentContent = currentMobileTab.querySelector('.pick-tab-content-item');
                            if (currentContent) {
                                currentContent.style.maxHeight = '0';
                            }
                            
                            // Activate next mobile tab
                            activateMobileTab(activeMobileIndex + 1);
                            
                            // Expand next mobile tab content
                            const nextMobileTab = mobileTabItems[activeMobileIndex + 1];
                            const nextContent = nextMobileTab.querySelector('.pick-tab-content-item');
                            if (nextContent) {
                                nextContent.style.maxHeight = nextContent.scrollHeight + 'px';
                            }
                        }
                    }
                }
            });
        });
        
        // Add CSS to style tabs properly
        const style = document.createElement('style');
        style.textContent = `
            /* Default cursor for all tabs */
            .pick-tabs-top__item {
                cursor: pointer;
            }
            
            /* Disable interactions for inactive tabs */
            .pick-tabs-top__item[style*="opacity: 0.5"] {
                pointer-events: none;
                cursor: default;
            }
            
            /* Remove hover effects from non-hoverable tabs */
            .pick-tabs-top__item:not(.tab-can-hover):hover {
                color: var(--color-gray);
                background: transparent;
            }
            .pick-tabs-top__item:not(.tab-can-hover):hover .pick-top__angle {
                background: #f4f5f7;
            }
            .pick-tabs-top__item:not(.tab-can-hover):hover .pick-top__angle svg path {
                fill: var(--color-gray);
            }
            
            /* Force blue background on active tabs */
            .pick-tabs-top__item.active {
                color: var(--color-white);
                background: var(--color-blue);
            }
            .pick-tabs-top__item.active .pick-top__angle {
                background: var(--color-blue-light);
            }
            .pick-tabs-top__item.active .pick-top__angle svg path {
                fill: var(--color-white);
            }
            
            /* Blue background for tab with red angle */
            .pick-tabs-top__item .pick-top__angle[style*="var(--color-red)"] {
                background: var(--color-red) !important;
            }
            .pick-tabs-top__item.last-selected {
                color: var(--color-white);
                background: var(--color-blue);
            }
            .pick-tabs-top__item.last-selected .pick-top__angle svg path {
                fill: var(--color-white);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Function to activate a specific tab
    function activateTab(index) {
        // First deactivate all tabs and content
        tabItems.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('last-selected');
        });
        tabContentItems.forEach(content => content.style.display = 'none');
        
        // Activate selected tab and content
        tabItems[index].classList.add('active');
        if (tabContentItems[index] && !isContentCollapsed) {
            tabContentItems[index].style.display = 'grid';
        }
        
        // Update tab visuals
        updateTabsVisuals();
    }
    
    // Function to activate a specific mobile tab
    function activateMobileTab(index) {
        if (mobileTabItems.length > 0) {
            // First deactivate all mobile tabs
            mobileTabItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Activate selected mobile tab
            mobileTabItems[index].classList.add('active');
            
            // Update opacity of mobile tabs
            updateMobileTabsOpacity();
        }
    }
    
    // Function to update visuals of tabs
    function updateTabsVisuals() {
        // Reset all tabs styling first (except active class)
        tabItems.forEach((item, i) => {
            // Reset angle background
            const angle = item.querySelector('.pick-top__angle');
            if (angle && i !== currentActiveTabIndex) {
                angle.style.background = '';
            }
            
            // Reset last-selected class
            item.classList.remove('last-selected');
            
            // Set all tabs to normal style
            item.style.opacity = '1';
            item.classList.add('tab-can-hover');
        });
        
        // Apply styles based on tab status
        tabItems.forEach((item, i) => {
            // Tabs after last active should have opacity 0.5
            if (i > lastActiveTabIndex) {
                item.style.opacity = '0.5';
                item.classList.remove('tab-can-hover');
            }
            
            // If this is the last active tab (but not the current active one),
            // set its angle to red and apply blue background
            if (i === lastActiveTabIndex && i !== currentActiveTabIndex) {
                const angle = item.querySelector('.pick-top__angle');
                if (angle) {
                    angle.style.background = 'var(--color-red)';
                }
                
                // Add class for blue background to last selected tab
                item.classList.add('last-selected');
            }
            
            // If content is collapsed for active tab, keep the red angle
            if (i === currentActiveTabIndex && isContentCollapsed) {
                const angle = item.querySelector('.pick-top__angle');
                if (angle) {
                    angle.style.background = 'var(--color-red)';
                }
            }
            
            // Make sure active tab has blue background via CSS class
            if (i === currentActiveTabIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Function to update opacity of mobile tabs based on active tab
    function updateMobileTabsOpacity() {
        if (mobileTabItems.length > 0) {
            const activeIndex = Array.from(mobileTabItems).findIndex(t => t.classList.contains('active'));
            
            mobileTabItems.forEach((item, i) => {
                // Tabs after last active should have opacity 0.5
                if (i > lastActiveTabIndex) {
                    item.style.opacity = '0.5';
                } else {
                    item.style.opacity = '1';
                }
            });
        }
    }
    
    // Initialize tabs
    initializeTabs();
});

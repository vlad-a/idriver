document.addEventListener('DOMContentLoaded', function() {
    // Находим все контейнеры pick-tabs на странице
    const pickTabsContainers = document.querySelectorAll('.pick-tabs, .pick-tabs--mobile');

    // Инициализируем каждый контейнер отдельно
    pickTabsContainers.forEach(container => {
        initializePickTabsContainer(container);
    });

    function initializePickTabsContainer(container) {
        // Get all tab items and tab content items within this container
        const tabItems = container.querySelectorAll('.pick-tabs-top__item');
        const tabContentItems = container.querySelectorAll('.pick-tab-content-item');
        const brandCells = container.querySelectorAll('.brand-cell');
        const mobileTabItems = container.querySelectorAll('.pick-tab-mobile-item');
        const isMobile = container.classList.contains('pick-tabs--mobile');
        
        // Store the selected items and last active tab index for this container
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

        // Initialize based on container type
        if (isMobile) {
            initializeMobileTabs();
        } else {
            initializeDesktopTabs();
        }
        
        // Initialize brand cells for this container
        initializeBrandCells();

        function initializeDesktopTabs() {
            // Initially show only first 3 tabs
            tabItems.forEach((tab, index) => {
                if (index > 2) {
                    tab.style.display = 'none';
                }
                // Store original text for resetting
                const pickTopTextElement = tab.querySelector('.pick-top__text');
                if (pickTopTextElement) {
                    tab.dataset.originalText = pickTopTextElement.textContent.trim();
                }
            });
            
            // Проверяем количество видимых вкладок для установки класса new-grid
            const pickTabsTop = container.querySelector('.pick-tabs-top');
            if (pickTabsTop) {
                const visibleTabs = Array.from(tabItems).filter(tab => tab.style.display !== 'none');
                if (visibleTabs.length > 3) {
                    pickTabsTop.classList.add('new-grid');
                } else {
                    pickTabsTop.classList.remove('new-grid');
                }
            }
            
            // Initially show first tab content
            activateTab(0);
            
            // Add a class to handle hover state only for active tabs
            tabItems.forEach((tab, index) => {
                if (index <= lastActiveTabIndex) {
                    tab.classList.add('tab-can-hover');
                } else {
                    tab.classList.remove('tab-can-hover');
                }
            });
            
            // Set click events for desktop tabs
            tabItems.forEach((tab, index) => {
                tab.addEventListener('click', function(e) {
                    if (index <= lastActiveTabIndex) {
                        if (index === currentActiveTabIndex) {
                            isContentCollapsed = !isContentCollapsed;
                            
                            if (isContentCollapsed) {
                                if (tabContentItems[index]) {
                                    tabContentItems[index].style.display = 'none';
                                }
                                
                                const angle = tab.querySelector('.pick-top__angle');
                                if (angle) {
                                    angle.style.background = 'var(--color-red)';
                                }
                            } else {
                                if (tabContentItems[index]) {
                                    tabContentItems[index].style.display = 'grid';
                                }
                                
                                const angle = tab.querySelector('.pick-top__angle');
                                if (angle) {
                                    angle.style.background = '';
                                }
                                
                                updateTabsVisuals();
                            }
                        } else {
                            currentActiveTabIndex = index;
                            isContentCollapsed = false;
                            activateTab(index);
                        }
                    }
                });
            });
        }

        function initializeMobileTabs() {
            if (mobileTabItems.length > 0) {
                // Store original text for all tabs
                mobileTabItems.forEach(tab => {
                    const header = tab.querySelector('.pick-tabs-top__item');
                    const text = header?.querySelector('.pick-top__text');
                    if (header && text) {
                        header.dataset.originalText = text.textContent.trim();
                    }
                });

                // Initially show first 3 tabs but make only first one active
                mobileTabItems.forEach((tab, index) => {
                    const header = tab.querySelector('.pick-tabs-top__item');
                    
                    if (header) {
                        if (index === 0) {
                            tab.style.display = 'block';
                            tab.classList.add('active');
                            header.style.opacity = '1';
                            header.classList.add('tab-can-hover');
                            const content = tab.querySelector('.pick-tab-content-item');
                            if (content) {
                                content.style.display = 'grid';
                            }
                        } else if (index <= 2) {
                            tab.style.display = 'block';
                            header.style.opacity = '0.5';
                            header.classList.remove('tab-can-hover');
                            const content = tab.querySelector('.pick-tab-content-item');
                            if (content) {
                                content.style.display = 'none';
                            }
                        } else {
                            tab.style.display = 'none';
                            header.style.opacity = '0.5';
                            header.classList.remove('tab-can-hover');
                        }
                        
                        // Проверяем количество видимых вкладок для установки класса new-grid
                        const pickTabsTop = tab.closest('.pick-tabs--mobile');
                        if (pickTabsTop) {
                            const visibleTabs = Array.from(mobileTabItems).filter(item => item.style.display !== 'none');
                            if (visibleTabs.length > 3) {
                                pickTabsTop.classList.add('new-grid');
                            } else {
                                pickTabsTop.classList.remove('new-grid');
                            }
                        }
                        
                        header.addEventListener('click', function() {
                            if (index <= lastActiveTabIndex) {
                                const wasActive = tab.classList.contains('active');
                                const content = tab.querySelector('.pick-tab-content-item');
                                const angleContainer = header.querySelector('.pick-top__angle');
                                
                                if (wasActive) {
                                    if (content) {
                                        if (content.style.display === 'grid') {
                                            content.style.display = 'none';
                                            if (angleContainer) {
                                                angleContainer.style.background = 'var(--color-red)';
                                            }
                                        } else {
                                            content.style.display = 'grid';
                                            if (angleContainer) {
                                                angleContainer.style.background = '';
                                            }
                                        }
                                    }
                                } else {
                                    let currentActiveTab = null;
                                    let currentActiveIndex = -1;
                                    mobileTabItems.forEach((item, idx) => {
                                        if (item.classList.contains('active')) {
                                            currentActiveTab = item;
                                            currentActiveIndex = idx;
                                        }
                                    });

                                    const noLastSelectedExists = !Array.from(mobileTabItems).some(item => 
                                        item.querySelector('.pick-tabs-top__item')?.classList.contains('last-selected')
                                    );

                                    if (currentActiveIndex === lastActiveTabIndex && index < currentActiveIndex && noLastSelectedExists) {
                                        const currentHeader = currentActiveTab.querySelector('.pick-tabs-top__item');
                                        if (currentHeader) {
                                            currentHeader.classList.add('last-selected');
                                            const currentAngle = currentHeader.querySelector('.pick-top__angle');
                                            if (currentAngle) {
                                                currentAngle.style.background = 'var(--color-red)';
                                            }
                                        }
                                    }

                                    if (currentActiveTab) {
                                        currentActiveTab.classList.remove('active');
                                        const currentContent = currentActiveTab.querySelector('.pick-tab-content-item');
                                        if (currentContent) {
                                            currentContent.style.display = 'none';
                                        }
                                    }

                                    tab.classList.add('active');
                                    if (content) {
                                        content.style.display = 'grid';
                                    }
                                    if (angleContainer) {
                                        angleContainer.style.background = '';
                                    }

                                    if (index >= 2 && index < mobileTabItems.length - 1) {
                                        const nextTab = mobileTabItems[index + 1];
                                        if (nextTab) {
                                            nextTab.style.display = 'block';
                                            const nextHeader = nextTab.querySelector('.pick-tabs-top__item');
                                            if (nextHeader) {
                                                nextHeader.style.opacity = '1';
                                                nextHeader.classList.add('tab-can-hover');
                                            }
                                            
                                            // Обновляем класс new-grid при изменении видимости вкладок
                                            const pickTabsTop = tab.closest('.pick-tabs--mobile');
                                            if (pickTabsTop) {
                                                const visibleTabs = Array.from(mobileTabItems).filter(item => item.style.display !== 'none');
                                                if (visibleTabs.length > 3) {
                                                    pickTabsTop.classList.add('new-grid');
                                                } else {
                                                    pickTabsTop.classList.remove('new-grid');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }

        function initializeBrandCells() {
            brandCells.forEach(cell => {
                cell.addEventListener('click', function() {
                    const cellText = cell.textContent.trim();
                    const mobileTab = cell.closest('.pick-tab-mobile-item');
                    const isCurrentlyActive = cell.classList.contains('active');
                    
                    if (!mobileTab) {
                        handleDesktopCellClick(cell, cellText, isCurrentlyActive);
                    } else {
                        handleMobileCellClick(cell, cellText, mobileTab, isCurrentlyActive);
                    }
                });
            });
        }

        function handleDesktopCellClick(cell, cellText, isCurrentlyActive) {
            const activeIndex = currentActiveTabIndex;
            
            if (!isCurrentlyActive) {
                if (activeIndex === 0) {
                    tabItems.forEach((tab, index) => {
                        tab.classList.remove('last-selected');
                        const angle = tab.querySelector('.pick-top__angle');
                        if (angle) {
                            angle.style.background = '';
                        }
                        if (index > 2) {
                            tab.style.display = 'none';
                            tab.style.opacity = '0.5';
                        }
                    });
                    lastActiveTabIndex = 0;
                    
                    // Обновляем класс new-grid для .pick-tabs-top
                    const pickTabsTop = container.querySelector('.pick-tabs-top');
                    if (pickTabsTop) {
                        const visibleTabs = Array.from(tabItems).filter(tab => tab.style.display !== 'none');
                        if (visibleTabs.length > 3) {
                            pickTabsTop.classList.add('new-grid');
                        } else {
                            pickTabsTop.classList.remove('new-grid');
                        }
                    }
                }
                
                // Сбрасываем значения всех последующих табов к их оригинальным значениям
                tabItems.forEach((tab, index) => {
                    if (index > activeIndex) {
                        const textElement = tab.querySelector('.pick-top__text');
                        if (textElement && tab.dataset.originalText) {
                            textElement.textContent = tab.dataset.originalText;
                        }
                    }
                });
                
                if (tabItems[activeIndex]) {
                    const pickTopTextElement = tabItems[activeIndex].querySelector('.pick-top__text');
                    if (pickTopTextElement) {
                        pickTopTextElement.textContent = cellText;
                    }
                }
                
                const parent = cell.closest('.pick-tab-content-item');
                if (parent) {
                    const cellsInTab = parent.querySelectorAll('.brand-cell');
                    cellsInTab.forEach(c => c.classList.remove('active'));
                    cell.classList.add('active');
                }
                
                if (activeIndex < tabItems.length - 1) {
                    lastActiveTabIndex = Math.max(lastActiveTabIndex, activeIndex + 1);
                    const nextTab = tabItems[activeIndex + 1];
                    
                    if (nextTab) {
                        if (activeIndex <= 1) {
                            if (activeIndex + 1 <= 2) {
                                nextTab.style.display = 'flex';
                                nextTab.classList.add('tab-can-hover');
                            }
                        } else {
                            nextTab.style.display = 'flex';
                            nextTab.classList.add('tab-can-hover');
                        }
                        
                        // Обновляем класс new-grid для .pick-tabs-top после изменения видимости
                        const pickTabsTop = container.querySelector('.pick-tabs-top');
                        if (pickTabsTop) {
                            const visibleTabs = Array.from(tabItems).filter(tab => tab.style.display !== 'none');
                            if (visibleTabs.length > 3) {
                                pickTabsTop.classList.add('new-grid');
                            } else {
                                pickTabsTop.classList.remove('new-grid');
                            }
                        }
                    }
                    
                    currentActiveTabIndex = activeIndex + 1;
                    isContentCollapsed = false;
                    activateTab(currentActiveTabIndex);
                }
            } else {
                if (activeIndex < tabItems.length - 1) {
                    currentActiveTabIndex = activeIndex + 1;
                    isContentCollapsed = false;
                    activateTab(currentActiveTabIndex);
                }
            }
        }

        function handleMobileCellClick(cell, cellText, mobileTab, isCurrentlyActive) {
            const mobileIndex = Array.from(mobileTabItems).indexOf(mobileTab);
            const header = mobileTab.querySelector('.pick-top__text');
            
            if (!isCurrentlyActive) {
                if (header) {
                    header.textContent = cellText;
                }
                
                Object.keys(selectedItems).forEach((key, idx) => {
                    if (idx === mobileIndex) {
                        selectedItems[key] = cellText;
                    } else if (idx > mobileIndex) {
                        selectedItems[key] = null;
                    }
                });
                
                mobileTabItems.forEach((item, idx) => {
                    if (idx > mobileIndex) {
                        const itemHeader = item.querySelector('.pick-top__text');
                        const parentTab = item.querySelector('.pick-tabs-top__item');
                        if (itemHeader && parentTab) {
                            itemHeader.textContent = parentTab.dataset.originalText || itemHeader.textContent;
                        }
                        
                        item.classList.remove('active');
                        if (parentTab) {
                            parentTab.classList.remove('last-selected', 'active', 'tab-can-hover');
                            parentTab.style.opacity = '0.5';
                            const angle = parentTab.querySelector('.pick-top__angle');
                            if (angle) {
                                angle.style.background = '';
                            }
                        }
                        
                        const itemCells = item.querySelectorAll('.brand-cell');
                        itemCells.forEach(c => c.classList.remove('active'));
                        const content = item.querySelector('.pick-tab-content-item');
                        if (content) {
                            content.style.display = 'none';
                        }
                        
                        item.style.display = idx > 2 ? 'none' : 'block';
                    }
                });
                
                // Обновляем класс new-grid после изменения видимости
                const pickTabsTop = mobileTab.closest('.pick-tabs--mobile');
                if (pickTabsTop) {
                    const visibleTabs = Array.from(mobileTabItems).filter(item => item.style.display !== 'none');
                    if (visibleTabs.length > 3) {
                        pickTabsTop.classList.add('new-grid');
                    } else {
                        pickTabsTop.classList.remove('new-grid');
                    }
                }
                
                const cellsInTab = mobileTab.querySelectorAll('.brand-cell');
                cellsInTab.forEach(c => c.classList.remove('active'));
                cell.classList.add('active');
            }
            
            if (mobileIndex < mobileTabItems.length - 1) {
                const nextTab = mobileTabItems[mobileIndex + 1];
                const nextHeader = nextTab.querySelector('.pick-tabs-top__item');
                
                lastActiveTabIndex = Math.max(lastActiveTabIndex, mobileIndex + 1);
                
                mobileTab.classList.remove('active');
                const currentContent = mobileTab.querySelector('.pick-tab-content-item');
                if (currentContent) {
                    currentContent.style.display = 'none';
                }
                
                nextTab.style.display = 'block';
                nextTab.classList.add('active');
                
                // Обновляем класс new-grid после изменения видимости
                const pickTabsTop = mobileTab.closest('.pick-tabs--mobile');
                if (pickTabsTop) {
                    const visibleTabs = Array.from(mobileTabItems).filter(item => item.style.display !== 'none');
                    if (visibleTabs.length > 3) {
                        pickTabsTop.classList.add('new-grid');
                    } else {
                        pickTabsTop.classList.remove('new-grid');
                    }
                }
                
                if (nextHeader) {
                    nextHeader.style.opacity = '1';
                    nextHeader.classList.add('tab-can-hover');
                    if (!isCurrentlyActive) {
                        const nextText = nextHeader.querySelector('.pick-top__text');
                        if (nextText && nextHeader.dataset.originalText) {
                            nextText.textContent = nextHeader.dataset.originalText;
                        }
                    }
                }
                
                const nextContent = nextTab.querySelector('.pick-tab-content-item');
                if (nextContent) {
                    nextContent.style.display = 'grid';
                    if (!isCurrentlyActive) {
                        const nextCells = nextContent.querySelectorAll('.brand-cell');
                        nextCells.forEach(c => c.classList.remove('active'));
                    }
                }
            }
        }
        
        function activateTab(index) {
            // Deactivate all tabs and content
            tabItems.forEach((item, i) => {
                item.classList.remove('active');
                item.classList.remove('last-selected');
                if (i <= lastActiveTabIndex) {
                    item.classList.add('tab-can-hover');
                } else {
                    item.classList.remove('tab-can-hover');
                }
            });
            
            tabContentItems.forEach(content => content.style.display = 'none');
            
            // Activate selected tab and content
            if (tabItems[index]) {
                tabItems[index].classList.add('active');
            }
            if (tabContentItems[index] && !isContentCollapsed) {
                tabContentItems[index].style.display = 'grid';
            }
            
            updateTabsVisuals();
        }
        
        function updateTabsVisuals() {
            tabItems.forEach(tab => tab.classList.remove('last-selected'));
            
            if (currentActiveTabIndex < lastActiveTabIndex) {
                const previousActiveTab = tabItems[lastActiveTabIndex];
                if (previousActiveTab) {
                    previousActiveTab.classList.add('last-selected');
                    const angle = previousActiveTab.querySelector('.pick-top__angle');
                    if (angle) {
                        angle.style.background = 'var(--color-red)';
                    }
                }
            }
            
            tabItems.forEach((item, i) => {
                const angle = item.querySelector('.pick-top__angle');
                if (angle && i !== currentActiveTabIndex) {
                    if (!item.classList.contains('last-selected')) {
                        angle.style.background = '';
                    }
                }
                
                item.style.opacity = '1';
                
                if (i <= lastActiveTabIndex) {
                    item.classList.add('tab-can-hover');
                } else {
                    item.classList.remove('tab-can-hover');
                    item.style.opacity = '0.5';
                }
                
                if (i === currentActiveTabIndex && isContentCollapsed) {
                    if (angle) {
                        angle.style.background = 'var(--color-red)';
                    }
                }
            });

            // Проверяем количество элементов для добавления/удаления класса new-grid
            const pickTabsTop = container.querySelector('.pick-tabs-top');
            if (pickTabsTop) {
                const visibleTabs = Array.from(tabItems).filter(tab => tab.style.display !== 'none');
                if (visibleTabs.length > 3) {
                    pickTabsTop.classList.add('new-grid');
                } else {
                    pickTabsTop.classList.remove('new-grid');
                }
            }
        }

        // Handle mobile state for this container
        function handleMobileState() {
            if (window.innerWidth < 768 && isMobile) {
                const firstTab = container.querySelector('.pick-tab-mobile-item:first-child');
                if (firstTab) {
                    const content = firstTab.querySelector('.pick-tab-content-item');
                    const angle = firstTab.querySelector('.pick-top__angle');
                    
                    if (content) {
                        content.style.display = 'none';
                    }
                    if (angle) {
                        angle.style.background = 'var(--color-red)';
                    }
                }
            }
        }

        // Add resize listener for this container
        window.addEventListener('resize', handleMobileState);
        
        // Initial mobile state check
        handleMobileState();
    }
});

$(document).ready(function () {
    // Removing automatic mobile menu activation
    // Now the mobile menu will only be shown when clicked

    // Удаляем конфликтующий jQuery обработчик:
    /*
    $(".catalog-btn").on("click", function () {
        if ($(window).width() < 1024) {
            $(this).toggleClass("active"); // Тогглим класс у самой .catalog-btn
            $(".mobile-menu").toggleClass("active"); // Тогглим класс у .mobile-menu
            $("body").toggleClass("menu-open"); // Блокируем скролл у body
        }
    });
    */

    // Оставляем и модифицируем этот обработчик:
    /*
    const catalogButton = document.querySelector(".catalog-btn");
    if (catalogButton) {
        catalogButton.addEventListener("click", function () {
            if (window.innerWidth < 1024) {
                this.classList.toggle("active"); // toggle самому .catalog-btn
                const mobileMenu = document.querySelector(".mobile-menu");
                if (mobileMenu) {
                    mobileMenu.classList.toggle("active");
                    document.body.classList.toggle("menu-open"); // Блокируем скролл у body
                }
            }
        });
    }
    */

    // JQEURY CODE
    if (typeof Swiper !== "undefined") {
        new Swiper(".preview-slider", {
            slidesPerView: 1, // Один слайд на экране
            slidesPerGroup: 1, // Прокручивается по одному
            loop: true, // Зацикленность
            spaceBetween: 0, // Без отступа

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    } else {
        console.log(
            "Swiper library is not loaded. Swiper initialization skipped."
        );
    }

    // AUTHENTICATION TABS

    const authTabs = document.querySelectorAll(".popup-auth-choise__item");
    const authForms = document.querySelectorAll(
        ".popup-auth-tabs__content form"
    );

    // Устанавливаем начальное состояние - первая форма активна
    if (authForms.length > 0 && authTabs.length > 0) {
        // Активируем первый таб и форму
        authTabs[0].classList.add("active");
        authForms[0].classList.add("active");

        // Добавляем обработчик клика для всех табов
        authTabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                // Снимаем активность у всех табов и форм
                authTabs.forEach((t) => t.classList.remove("active"));
                authForms.forEach((form) => form.classList.remove("active"));

                // Активируем текущий таб
                tab.classList.add("active");

                // Активируем соответствующую форму
                if (index < authForms.length) {
                    authForms[index].classList.add("active");
                }
            });
        });
    }

    // VANILLA JS CODE

    // CHOISE PICK TABLE TD CLICK
    document.querySelectorAll(".pick-tab-content-item").forEach((wrapper) => {
        const cells = wrapper.querySelectorAll(".brand-cell");

        cells.forEach((cell) => {
            cell.addEventListener("click", function () {
                if (this.textContent.trim() === "") return;

                cells.forEach((c) => {
                    if (c.textContent.trim() !== "")
                        c.classList.remove("active");
                });

                this.classList.add("active");
            });
        });
    });

    // TABS FOR ALPHABET
    const tabsAlphabet = document.querySelectorAll(
        ".catalog-alphabet-list__item"
    );
    const tabItemsAlphabet = document.querySelectorAll(".catalog-list-tab");

    tabsAlphabet.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            // Удаляем активный класс у всех табов
            tabsAlphabet.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            // Скрываем все таб-контенты
            tabItemsAlphabet.forEach((item) => {
                item.style.display = "none";
                item.style.opacity = 0;
            });

            // Показываем нужный с fadeIn
            const target = tabItemsAlphabet[index];
            target.style.display = "grid";
            setTimeout(() => {
                target.style.opacity = 1;
                target.style.transition = "opacity 0.3s ease";
            }, 10);
        });
    });

    // Активируем первый таб
    if (tabsAlphabet[0]) {
        tabsAlphabet[0].classList.add("active");
        tabItemsAlphabet[0].style.display = "grid";
        tabItemsAlphabet[0].style.opacity = 1;
    }

    // READ MORE BTN
    const moreButtons = document.querySelectorAll(".catalog-info-more");

    moreButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Находим соответствующий текстовый блок
            const textBlock = this.previousElementSibling;
            const buttonText = this.querySelector(".catalog-info-more__text");
			const buttonAngle = this.querySelector(".catalog-info-more__angle");

            // Проверяем, что это действительно текстовый блок
            if (textBlock.classList.contains("catalog-info__text")) {
                // Toggle expanded state
                const isExpanded = textBlock.classList.toggle("expanded");
                
                // Update button text based on state
                if (buttonText) {
                    buttonText.textContent = isExpanded ? "Скрыть" : "Показать больше";
					buttonAngle.classList.toggle("active");
                }
            }
        });
    });

    // HEADER CONTENT TABS
    document.querySelectorAll(".catalog-window").forEach((windowEl) => {
        const tabsHeader = windowEl.querySelectorAll(".catalog-tab");
        const contents = windowEl.querySelectorAll(".catalog-content-item");
        const defaultContent = contents[0];

        tabsHeader.forEach((tab) => {
            tab.addEventListener("mouseenter", () => {
                const id = tab.dataset.tab;

                // Снимаем активность у всех табов и контента внутри текущего окна
                tabsHeader.forEach((t) => t.classList.remove("active"));
                contents.forEach((content) =>
                    content.classList.remove("active")
                );

                // Активируем нужный таб и соответствующий контент
                tab.classList.add("active");
                const target = windowEl.querySelector(
                    `.catalog-content-item[data-content="${id}"]`
                );
                if (target) target.classList.add("active");
            });
        });
    });

    // LazyLoad для изображений
    setupLazyLoad();

    // CATALOG DROPDOWN
    const parts = document.querySelectorAll(".detail-model-part");

    parts.forEach((part) => {
        const top = part.querySelector(".detail-model-top");
        const list = part.querySelector(".popular-details-list");

        top.addEventListener("click", () => {
            const isActive = top.classList.contains("active");

            // Закрыть все
            parts.forEach((p) => {
                const t = p.querySelector(".detail-model-top");
                const l = p.querySelector(".popular-details-list");
                t.classList.remove("active");
                l.style.maxHeight = null;
            });

            // Если текущий не был активен — открыть его
            if (!isActive) {
                top.classList.add("active");
                list.style.maxHeight = list.scrollHeight + "px";
            }
        });
    });

    // Footer accordion (только для мобильных устройств)
    const footerItems = document.querySelectorAll(".footer-item");
    const isMobile = () => window.innerWidth < 768;

    // Функция для настройки аккордеона в зависимости от размера экрана
    const setupFooterAccordion = () => {
        footerItems.forEach((item) => {
            const topElement = item.querySelector(".footer-item-top");
            const listElement = item.querySelector(".footer-list");

            if (!topElement || !listElement) return;

            // На десктопе показываем все списки
            if (!isMobile()) {
                listElement.style.maxHeight = "";
                listElement.style.overflow = "";
                topElement.classList.remove("active");
                return;
            }

            // На мобильных скрываем списки
            if (!topElement.classList.contains("active")) {
                listElement.style.maxHeight = "0px";
                listElement.style.overflow = "hidden";
            }
        });
    };

    // Инициализация при загрузке
    setupFooterAccordion();

    // Обновление при изменении размера окна
    window.addEventListener("resize", setupFooterAccordion);

    // Обработчик кликов для мобильной версии
    footerItems.forEach((item) => {
        const topElement = item.querySelector(".footer-item-top");
        const listElement = item.querySelector(".footer-list");

        if (topElement && listElement) {
            topElement.addEventListener("click", function (e) {
                // Работаем только на мобильных
                if (!isMobile()) return;

                // Если текущий элемент уже активен, закрываем его
                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    listElement.style.maxHeight = "0px";
                } else {
                    // Закрываем все остальные
                    document
                        .querySelectorAll(".footer-item-top.active")
                        .forEach((activeTop) => {
                            if (activeTop !== this) {
                                activeTop.classList.remove("active");
                                const activeList = activeTop.nextElementSibling;
                                if (
                                    activeList &&
                                    activeList.classList.contains("footer-list")
                                ) {
                                    activeList.style.maxHeight = "0px";
                                }
                            }
                        });

                    // Открываем текущий
                    this.classList.add("active");
                    listElement.style.maxHeight =
                        listElement.scrollHeight + "px";
                }
            });
        }
    });

    // Простая функция для ленивой загрузки изображений
    function setupLazyLoad() {
        // Добавляем стили для эффекта появления
        const style = document.createElement("style");
        style.textContent = `
        img.lazy {
            opacity: 0;
            transition: opacity 0.5s ease-in, transform 0.5s ease-in;
            transform: scale(0.95);
            filter: blur(5px);
            will-change: opacity, transform;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }
        img.lazy.loaded {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
        }
    `;
        document.head.appendChild(style);

        // Находим все изображения
        const images = document.querySelectorAll("img");

        // Обрабатываем каждое изображение
        images.forEach((img) => {
            // Сохраняем оригинальный src
            const originalSrc = img.src;

            // Пропускаем SVG и изображения в критических местах (header, logo)
            if (
                originalSrc &&
                originalSrc.indexOf(".svg") === -1 &&
                !img.closest("header") &&
                !img.closest(".logo")
            ) {
                // Добавляем класс для стилей
                img.classList.add("lazy");

                // Сохраняем оригинальный src в data-src
                img.dataset.src = originalSrc;
                
                // Используем прозрачный 1x1 пиксель вместо SVG для лучшей совместимости
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            }
        });

        // Функция загрузки с IntersectionObserver
        const lazyLoad = () => {
            if ("IntersectionObserver" in window) {
                const imageObserver = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                if (img.dataset.src) {
                                    // Создаем временное изображение для предзагрузки
                                    const tempImg = new Image();

                                    tempImg.onload = () => {
                                        requestAnimationFrame(() => {
                                        img.src = img.dataset.src;
                                        img.classList.add("loaded");
                                        img.removeAttribute("data-src");
                                        });
                                    };

                                    tempImg.onerror = () => {
                                        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                                        img.style.opacity = "0.3";
                                    };

                                    tempImg.src = img.dataset.src;
                                    observer.unobserve(img);
                                }
                            }
                        });
                    },
                    {
                        rootMargin: "50px 0px",
                        threshold: 0.1
                    }
                );

                document.querySelectorAll("img.lazy").forEach((img) => {
                    imageObserver.observe(img);
                });
            } else {
                // Запасной вариант для браузеров без поддержки IntersectionObserver
                document.querySelectorAll("img.lazy").forEach((img) => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add("loaded");
                        img.removeAttribute("data-src");
                    }
                });
            }
        };

        // Запускаем ленивую загрузку
        if (document.readyState === "complete") {
            lazyLoad();
        } else {
            window.addEventListener("load", lazyLoad);
        }

        // popups
        const popups = document.querySelectorAll(".popup");

        // Открытие попапа
        document.querySelectorAll("[data-popup]").forEach((btn_trigger) => {
            btn_trigger.addEventListener("click", function (e) { // 'this' is btn_trigger (the element with data-popup)
                e.stopPropagation(); // Stop the event from bubbling up to parent [data-popup] elements
                
                // If the trigger element ('this') is a popup div itself,
                // and the actual click (e.target) originated from its own internal
                // close button or background, then we should let the dedicated close handlers
                // (already attached to .popup__back and .popup-close) do their work.
                // We return here to prevent this opening logic from re-adding the 'active' class.
                if (this.classList.contains("popup")) {
                    const clickedElement = e.target;
                    
                    // Check against this popup's specific back button
                    const ownBackButton = this.querySelector(":scope > .popup__back");
                    if (ownBackButton && (ownBackButton === clickedElement || ownBackButton.contains(clickedElement))) {
                        return; 
                    }

                    // Check against this popup's specific close button (and its children like SVG)
                    // The path to popup-close might vary, but based on provided HTML for garage-inner:
                    // <div class="popup"><div class="popup__content"><div class="popup-close">
                    const ownCloseButton = this.querySelector(":scope > .popup__content > .popup-close");
                    if (ownCloseButton && (ownCloseButton === clickedElement || ownCloseButton.contains(clickedElement))) {
                        return;
                    }
                }

                const popupName = this.getAttribute("data-popup");
                const targetPopup = document.querySelector(
                    `.popup[data-popup="${popupName}"]`
                );

                // Закрыть все попапы
                popups.forEach((p) => p.classList.remove("active"));

                // Открыть нужный
                if (targetPopup) {
                    targetPopup.classList.add("active");
                }
            });
        });

        // Закрытие по кнопке или фону
        popups.forEach((popup) => {
            const back = popup.querySelector(".popup__back");
            const close = popup.querySelector(".popup-close");

            if (back) {
                back.addEventListener("click", () => {
                    popup.classList.remove("active");
                });
            }

            if (close) {
                close.addEventListener("click", () => {
                    popup.classList.remove("active");
                });
            }
        });

        // Объявляем общие элементы и функцию
        // Объявляем общие элементы и функцию
        const trigger = document.getElementById("personal-information-change");
        const inputBlock = document.querySelectorAll(
            ".personal-info-item__change"
        );
        const staticBlocks = document.querySelectorAll(
            ".personal-info-item__static"
        );
        const buttonsBlocks = document.querySelectorAll(
            ".profile-personal-btns"
        );
        const cancelBtn = document.querySelector(
            ".profile-personal-btns .btn--transparent"
        );
        const saveBtn = document.querySelector(
            ".profile-personal-btns .btn--blue"
        );

        // Функция переключения режима редактирования
        function toggleEditMode() {
            inputBlock.forEach((block) => block.classList.toggle("active"));
            staticBlocks.forEach((block) => block.classList.toggle("active"));
            buttonsBlocks.forEach((block) => block.classList.toggle("active"));
        }

        // Вешаем обработчики
        if (trigger) {
            trigger.addEventListener("click", toggleEditMode);
        }

        if (cancelBtn && saveBtn) {
            // Обработчик для кнопки "Отмена"
            cancelBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                toggleEditMode();
            });

            // Обработчик для кнопки "Сохранить"
            saveBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                // Здесь должна быть логика сохранения данных
                toggleEditMode();
            });
        }
        // Кастомный селект (исправленная версия)
        document.querySelectorAll(".custom-select").forEach((select) => {
            const triggerSelect = select.querySelector(
                ".custom-select__trigger"
            );
            const options = select.querySelectorAll(".custom-select__option");
            const textMain = select.querySelector(".custom-select__text-main");

            if (triggerSelect) {
                triggerSelect.addEventListener("click", function () {
                    select.classList.toggle("open");
                });
            }

            options.forEach((option) => {
                option.addEventListener("click", function () {
                    if (textMain) {
                        textMain.textContent = this.textContent;
                    }
                    select.classList.remove("open");
                });
            });

            document.addEventListener("click", function (e) {
                if (!select.contains(e.target)) {
                    select.classList.remove("open");
                }
            });
        });

        // Находим все элементы-триггеры
        const closeTriggers = document.querySelectorAll(
            ".profile-aside__back, .profile-aside__hide, .profile-aside-item"
        );
        const openTrigger = document.querySelector(".profile-mobile__open");
        const profileAside = document.querySelector(".profile-aside");
        const profileAsideBack = document.querySelector(".profile-aside__back");
        const profileAsideItems = document.querySelectorAll(
            ".profile-aside-item"
        );
        const profileMobileText = document.querySelector(
            ".profile-mobile__text"
        );

        const openSidebar = () => {
            profileAside.classList.add("active");
            if (profileAsideBack) profileAsideBack.classList.add("active");
        };

        const closeSidebar = () => {
            profileAside.classList.remove("active");
            if (profileAsideBack) profileAsideBack.classList.remove("active");
        };

        const handleClick = (event) => {
            const trigger = event.currentTarget;
            closeSidebar();

            if (trigger.classList.contains("profile-aside-item")) {
                profileAsideItems.forEach((item) =>
                    item.classList.remove("active")
                );
                trigger.classList.add("active");

                // Копирование текста
                if (profileMobileText) {
                    const textElement = trigger.querySelector(
                        ".profile-aside-item__text"
                    );
                    if (textElement) {
                        profileMobileText.textContent =
                            textElement.textContent.trim();
                    }
                }
            }
        };

        if (profileAside) {
            closeTriggers.forEach((trigger) => {
                trigger.addEventListener("click", handleClick);
            });

            if (openTrigger) {
                openTrigger.addEventListener("click", openSidebar);
            }
        }
    }

    // Script for profile order details toggle
    $(document).ready(function () {
        // Initially hide the order details section
        $(".profile-order-details").addClass("hidden");

        // When a .profile-order__details is clicked
        $(document).on("click", ".profile-order__details", function () {
            const $orderList = $(this)
                .closest(".profile-order__content")
                .find(".profile-order-list");
            const $orderDetails = $(this)
                .closest(".profile-order__content")
                .find(".profile-order-details");

            $orderList.css("opacity", 0);
            setTimeout(function () {
                $orderList.addClass("hidden");
                $orderDetails.removeClass("hidden");
                setTimeout(function () {
                    $orderDetails.css("opacity", 1);
                }, 50); // Short delay to ensure display:block is applied before opacity transition
            }, 500); // Match CSS transition duration
        });

        // When a .prodile-order-details__back is clicked
        $(document).on("click", ".prodile-order-details__back", function () {
            const $orderList = $(this)
                .closest(".profile-order__content")
                .find(".profile-order-list");
            const $orderDetails = $(this)
                .closest(".profile-order__content")
                .find(".profile-order-details");

            $orderDetails.css("opacity", 0);
            setTimeout(function () {
                $orderDetails.addClass("hidden");
                $orderList.removeClass("hidden");
                setTimeout(function () {
                    $orderList.css("opacity", 1);
                }, 50); // Short delay
            }, 500); // Match CSS transition duration
        });
    });

    // Accordion for profile order details dropdown
    document
        .querySelectorAll(".profile-order-details-dropdown__show")
        .forEach((showElement) => {
            showElement.addEventListener("click", function () {
                const dropdown = this.closest(
                    ".profile-order-details-dropdown"
                );
                const content = dropdown.querySelector(
                    ".profile-order-details-dropdown-content"
                );
                const showTextElement = this.querySelector(
                    ".profile-order-details-dropdown__show--text"
                );

                if (dropdown.classList.contains("open")) {
                    // Close the dropdown
                    content.style.maxHeight = "0";
                    dropdown.classList.remove("open");
                    if (showTextElement) {
                        showTextElement.textContent = "Показать";
                    }
                } else {
                    // Open the dropdown
                    content.style.maxHeight = content.scrollHeight + "px";
                    dropdown.classList.add("open");
                    if (showTextElement) {
                        showTextElement.textContent = "Скрыть";
                    }
                }
            });
        });

    // Profile Page Tabs
    const profileTabs = document.querySelectorAll(".profile-aside-item");
    const profileContents = document.querySelectorAll(
        ".profile-content .profile-content-tab"
    );

    profileTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Deactivate all tabs
            profileTabs.forEach((t) => t.classList.remove("active"));

            // Deactivate all content panes by removing the 'active' class.
            // CSS (.profile-content-tab and .profile-content-tab.active)
            // will handle making them display:none and opacity:0 with transition.
            profileContents.forEach((c) => {
                c.classList.remove("active");
            });

            // Activate the clicked tab
            tab.classList.add("active");

            // Activate the corresponding content pane.
            // CSS's .active class will make it display:block and opacity:1 (with transition).
            const newActiveContent = profileContents[index];
            if (newActiveContent) {
                // A minimal timeout can help ensure that class removals are processed
                // before class additions, aiding smooth transitions when display properties change.
                setTimeout(() => {
                    newActiveContent.classList.add("active");
                }, 0);
            }
        });
    });

    // Initially activate the first tab and content if they exist
    if (profileTabs.length > 0 && profileContents.length > 0) {
        profileTabs[0].classList.add("active");
        profileContents[0].classList.add("active"); // CSS .active class handles display and opacity
    }

    // My Garage VIN input field interaction
    document
        .querySelectorAll(".my-garage-correct")
        .forEach((correctSection) => {
            const inputWrappers = correctSection.querySelectorAll(
                ".my-garage-correct--field .my-garage-correct-item.d-flex"
            );
            const buttonsContainer = correctSection.querySelector(
                ".profile-personal-btns"
            );
            const cancelBtn =
                buttonsContainer?.querySelector(".btn--transparent");
            const saveBtn = buttonsContainer?.querySelector(".btn--blue");

            const deactivateSection = () => {
                inputWrappers.forEach((wrapper) =>
                    wrapper.classList.remove("active")
                );
                correctSection.classList.remove("editing");
                const focusedInput =
                    correctSection.querySelector("input:focus");
                if (focusedInput) {
                    focusedInput.blur();
                }
            };

            inputWrappers.forEach((inputWrapper) => {
                const input = inputWrapper.querySelector('input[type="text"]');
                const correctIcon = inputWrapper.querySelector(
                    ".my-garage-correct-item__to-correct"
                );
                const closeIcon = inputWrapper.querySelector(
                    ".my-garage-correct-item__to-close"
                );

                if (input) {
                    const activateEditState = () => {
                        // Deactivate other items in the same section first if needed, or allow multiple active
                        // For now, let's assume only one item is truly "active" for editing icons, but section remains editing.
                        inputWrappers.forEach((iw) => {
                            if (iw !== inputWrapper)
                                iw.classList.remove("active");
                        });
                        inputWrapper.classList.add("active");
                        correctSection.classList.add("editing");
                    };

                    input.addEventListener("focus", activateEditState);

                    input.addEventListener("blur", (event) => {
                        const relatedTarget = event.relatedTarget;
                        setTimeout(() => {
                            if (
                                !correctSection.contains(relatedTarget) &&
                                !inputWrapper.contains(relatedTarget)
                            ) {
                                inputWrapper.classList.remove("active");
                                const anyOtherActive = Array.from(
                                    inputWrappers
                                ).some((iw) => iw.classList.contains("active"));
                                if (!anyOtherActive) {
                                    correctSection.classList.remove("editing");
                                }
                            }
                        }, 0);
                    });

                    inputWrapper.addEventListener("click", (e) => {
                        if (
                            e.target === inputWrapper ||
                            (correctIcon && correctIcon.contains(e.target))
                        ) {
                            input.focus();
                        }
                    });

                    if (closeIcon) {
                        closeIcon.addEventListener("mousedown", (e) => {
                            e.preventDefault(); // Prevent default focus shifts
                            inputWrapper.classList.remove("active");
                            if (input) {
                                input.value = ""; // Clear the input value
                                input.blur(); // Explicitly remove focus from the input
                            }

                            // Use setTimeout to allow blur event to potentially process first if needed,
                            // and then check if the section should stop editing.
                            setTimeout(() => {
                                // Check if any other input wrappers in this section are still active.
                                const anyOtherStillActive = Array.from(
                                    inputWrappers
                                ).some(
                                    (iw) =>
                                        iw !== inputWrapper &&
                                        iw.classList.contains("active")
                                );
                                // If no other items are active, remove the editing class from the section
                                if (!anyOtherStillActive) {
                                    correctSection.classList.remove("editing");
                                }
                            }, 0); // Timeout 0 allows blur/other events to potentially clear first
                        });
                    }
                }
            });

            if (cancelBtn) {
                cancelBtn.addEventListener("click", deactivateSection);
            }
            if (saveBtn) {
                saveBtn.addEventListener("click", () => {
                    // Add save logic here if needed
                    deactivateSection();
                });
            }
        });

    // My Garage Tabs ("Мои авто" / "Архив")
    const myGarageTabs = document.querySelectorAll(
        ".my-garage-tabs .my-garage-tab"
    );
    const myGarageContents = document.querySelectorAll(
        ".my-garage-content-tabs .my-garage-content"
    );

    myGarageTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            myGarageTabs.forEach((t) => t.classList.remove("active"));
            myGarageContents.forEach((c) => c.classList.remove("active"));
            tab.classList.add("active");
            const activeContent = myGarageContents[index];
            if (activeContent) {
                setTimeout(() => {
                    activeContent.classList.add("active");
                }, 0);
            }
        });
    });

    if (myGarageTabs.length > 0 && myGarageContents.length > 0) {
        if (!document.querySelector(".my-garage-tabs .my-garage-tab.active")) {
            myGarageTabs[0].classList.add("active");
        }
        const initiallyActiveTabIndex = Array.from(myGarageTabs).findIndex(
            (tab) => tab.classList.contains("active")
        );
        if (
            initiallyActiveTabIndex !== -1 &&
            myGarageContents[initiallyActiveTabIndex]
        ) {
            myGarageContents.forEach((content, idx) => {
                content.classList.toggle(
                    "active",
                    idx === initiallyActiveTabIndex
                );
            });
        } else if (myGarageContents[0]) {
            myGarageContents[0].classList.add("active");
        }
    }

    function setupMobileCatalogNavigation() {
        const mobileMenuBottom = document.querySelector(".mobile-menu-bottom");
        const catalogCurrent = document.querySelector(
            ".mobile-menu-bottom .catalog-current"
        );

        if (!mobileMenuBottom || !catalogCurrent || window.innerWidth >= 830) {
            if (catalogCurrent) {
                const catalogMainText =
                    catalogCurrent.querySelector(".catalog-main");
                const catalogAngle = catalogCurrent.querySelector(
                    ".catalog-main-angle"
                );
                const catalogInnerText =
                    catalogCurrent.querySelector(".catalog-inner");
                if (catalogMainText) catalogMainText.textContent = "Каталог";
                if (catalogAngle) catalogAngle.style.display = "none";
                if (catalogInnerText) catalogInnerText.innerHTML = "";
                catalogCurrent.style.display = "flex";
            }
            const backButton = document.querySelector(".mobile-catalog-back");
            if (backButton) backButton.style.display = "none";

            const catalogTabsContainer = document.querySelector(
                ".mobile-menu-bottom .catalog-tabs"
            );
            if (catalogTabsContainer)
                catalogTabsContainer.style.display = "block";
            return;
        }

        const DEFAULT_CATALOG_MAIN_TEXT = "Каталог запчастин i автотоварів";

        const catalogBox = mobileMenuBottom.querySelector(".catalog-box");
        const catalogTabsContainer =
            mobileMenuBottom.querySelector(".catalog-tabs");
        const catalogContent =
            mobileMenuBottom.querySelector(".catalog-content");
        const catalogTabs = mobileMenuBottom.querySelectorAll(".catalog-tab");

        const catalogMainText = catalogCurrent.querySelector(".catalog-main");
        const catalogAngle = catalogCurrent.querySelector(
            ".catalog-main-angle"
        );
        const catalogInnerText = catalogCurrent.querySelector(".catalog-inner");

        let currentLevel = 1;
        let navigationPath = ["Каталог"];
        let activeTabContent = null;
        let activeTitleBox = null;

        let backButton = mobileMenuBottom.querySelector(".mobile-catalog-back");
        if (!backButton && catalogBox) {
            backButton = document.createElement("div");
            backButton.classList.add("mobile-catalog-back");
            catalogBox.insertBefore(backButton, catalogBox.firstChild);
        }

        if (
            backButton &&
            (!backButton.querySelector("svg") ||
                !backButton.querySelector("span"))
        ) {
            backButton.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#152242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span></span>`;
        }
        const backButtonTextSpan = backButton
            ? backButton.querySelector("span")
            : null;

        function updateDisplayElements() {
            if (
                !catalogCurrent ||
                !catalogMainText ||
                !catalogAngle ||
                !catalogInnerText ||
                !backButton ||
                !backButtonTextSpan
            )
                return;

            catalogCurrent.classList.remove("catalog-current-default"); // Remove by default

            // Back Button Logic
            if (currentLevel === 1) {
                backButton.style.display = "none";
            } else {
                backButton.style.display = "flex";
                // navigationPath[0] is "Каталог"
                // navigationPath[1] is Main Category Name (e.g., "Все для то")
                // navigationPath[2] is Subcategory Name (e.g., "Фильтры")
                if (currentLevel === 2) {
                    backButtonTextSpan.textContent = navigationPath[1]; // Text of the main category (e.g., "Все для то")
                } else if (currentLevel === 3) {
                    backButtonTextSpan.textContent = navigationPath[2]; // Text of the subcategory (e.g., "Фильтры")
                }
            }

            // Catalog Current (Header/Breadcrumb) Logic
            catalogCurrent.style.display = "flex";
            catalogMainText.onclick = null;
            catalogMainText.style.cursor = "default";
            catalogInnerText.innerHTML = "";
            catalogAngle.style.display = "none";

            if (currentLevel === 1) {
                catalogMainText.textContent = DEFAULT_CATALOG_MAIN_TEXT; 
                catalogCurrent.classList.add("catalog-current-default"); 
            } else if (currentLevel === 2) {
                // Viewing subcategories of navigationPath[1]
                catalogMainText.textContent = navigationPath[0]; 
                catalogMainText.style.cursor = "pointer";
                catalogMainText.onclick = () => {
                    navigationPath = [navigationPath[0]];
                    showLevel(1);
                };
            } else if (currentLevel === 3) {
                // Viewing links under navigationPath[2], child of navigationPath[1]
                catalogMainText.textContent = navigationPath[0]; // "Каталог"
                catalogMainText.style.cursor = "pointer";
                catalogMainText.onclick = () => {
                    navigationPath = [navigationPath[0]];
                    showLevel(1);
                };
                catalogAngle.style.display = "inline-block";
                // Inner text is the Main Category Name (parent of the current Subcategory view)
                catalogInnerText.innerHTML = `<span class="breadcrumb-link" data-level-target="2">${navigationPath[1]}</span>`;

                const breadcrumbLink =
                    catalogInnerText.querySelector(".breadcrumb-link");
                if (breadcrumbLink) {
                    breadcrumbLink.style.cursor = "pointer";
                    breadcrumbLink.onclick = () => {
                        navigationPath = navigationPath.slice(0, 2); // Go to ["Каталог", "MainCatName"]
                        // activeTabContent should correspond to navigationPath[1]
                        const mainCatText = navigationPath[1];
                        const targetTab = Array.from(catalogTabs).find(
                            (t) =>
                                t
                                    .querySelector(".catalog-tab__text")
                                    .textContent.trim() === mainCatText
                        );
                        if (targetTab) {
                            activeTabContent = mobileMenuBottom.querySelector(
                                `.catalog-content-item[data-content="${targetTab.dataset.tab}"]`
                            );
                        }
                        activeTitleBox = null;
                        showLevel(2);
                    };
                }
            }
        }

        function showLevel(level) {
            currentLevel = level;
            updateDisplayElements();

            if (catalogBox) { // Ensure catalogBox element exists
                if (level > 1) {
                    catalogBox.classList.add("catalog-box--deeper");
                } else {
                    catalogBox.classList.remove("catalog-box--deeper");
                }
            }

            catalogTabsContainer.style.display = level === 1 ? "block" : "none";
            if (catalogContent)
                catalogContent.style.display = level > 1 ? "block" : "none";

            mobileMenuBottom
                .querySelectorAll(".catalog-content-item")
                .forEach((item) => (item.style.display = "none"));
            mobileMenuBottom
                .querySelectorAll(".catalog-content-item__box")
                .forEach((box) => (box.style.display = "none"));

            if (level === 1) {
                activeTabContent = null;
                activeTitleBox = null;
                catalogTabs.forEach((t) => (t.style.display = "flex"));
            } else if (level === 2 && activeTabContent) {
                activeTabContent.style.display = "block";
                activeTabContent
                    .querySelectorAll(".catalog-content-item__box")
                    .forEach((box) => {
                        box.style.display = "block";
                        box.querySelector(
                            ".catalog-content-item__title"
                        ).style.display = "flex";
                        box.querySelectorAll(
                            ".catalog-content-item__link"
                        ).forEach((link) => (link.style.display = "none"));
                    });
            } else if (level === 3 && activeTitleBox) {
                if (activeTabContent) activeTabContent.style.display = "block";
                activeTitleBox.style.display = "block";
                activeTitleBox.querySelector(
                    ".catalog-content-item__title"
                ).style.display = "none";
                activeTitleBox
                    .querySelectorAll(".catalog-content-item__link")
                    .forEach((link) => (link.style.display = "flex"));
            }
        }

        catalogTabs.forEach((tab) => {
            tab.addEventListener("click", function (e) {
                e.preventDefault();
                if (currentLevel !== 1) return;
                const tabText =
                    this.querySelector(".catalog-tab__text").textContent.trim();
                navigationPath = ["Каталог", tabText]; // Level 2 path
                const tabId = this.dataset.tab;
                activeTabContent = mobileMenuBottom.querySelector(
                    `.catalog-content-item[data-content="${tabId}"]`
                );
                activeTitleBox = null;
                if (activeTabContent) {
                    showLevel(2);
                }
            });
        });

        mobileMenuBottom
            .querySelectorAll(".catalog-content-item__title")
            .forEach((title) => {
                title.style.cursor = "pointer";
                title.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (currentLevel !== 2 || !activeTabContent) return;
                    const titleText = this.textContent.trim();
                    // navigationPath is ["Каталог", "MainCatName"] from Level 2
                    navigationPath = [
                        navigationPath[0],
                        navigationPath[1],
                        titleText,
                    ]; // Level 3 path
                    activeTitleBox = this.closest(".catalog-content-item__box");
                    if (activeTitleBox) {
                        showLevel(3);
                    }
                });
            });

        if (backButton) {
            backButton.addEventListener("click", function (e) {
                e.preventDefault();
                if (currentLevel > 1) {
                    navigationPath.pop();
                    const newLevel = currentLevel - 1;
                    if (newLevel === 1) {
                        activeTabContent = null;
                        activeTitleBox = null;
                    } else if (newLevel === 2) {
                        // navigationPath is now ["Каталог", "MainCatName"]
                        const mainCatText = navigationPath[1];
                        const targetTab = Array.from(catalogTabs).find(
                            (t) =>
                                t
                                    .querySelector(".catalog-tab__text")
                                    .textContent.trim() === mainCatText
                        );
                        if (targetTab) {
                            activeTabContent = mobileMenuBottom.querySelector(
                                `.catalog-content-item[data-content="${targetTab.dataset.tab}"]`
                            );
                        } else {
                            activeTabContent = null;
                        }
                        activeTitleBox = null;
                    }
                    showLevel(newLevel);
                }
            });
        }
        showLevel(1); // Default to level 1 for simplicity on re-init / resize scenarios
    }

    // Call setupMobileCatalogNavigation immediately to ensure it runs on page load
    setupMobileCatalogNavigation();
    
    window.addEventListener("load", setupMobileCatalogNavigation);
    window.addEventListener("resize", setupMobileCatalogNavigation);
    // Mobile Menu Toggle
    const allCatalogBtns = document.querySelectorAll(".catalog-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (allCatalogBtns.length > 0 && mobileMenu) {
        allCatalogBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                // Only proceed if the screen width is less than 1024px
                if (window.innerWidth < 1024) {
                    // Toggle mobile menu active state first
                    mobileMenu.classList.toggle("active");
                    const isMenuNowActive = mobileMenu.classList.contains("active");

                    // Synchronize all catalog buttons' active class
                    allCatalogBtns.forEach(cb => {
                        if (isMenuNowActive) {
                            cb.classList.add("active");
                        } else {
                            cb.classList.remove("active");
                        }
                    });

                    // Handle body overflow and 'menu-open' class
                    if (isMenuNowActive) {
                        document.body.style.overflow = "hidden";
                        document.body.classList.add("menu-open");
                        // Reset mobile catalog navigation to level 1 when opening
                        if (
                            typeof setupMobileCatalogNavigation === "function" &&
                            window.innerWidth < 830 // This specific condition for navigation setup can remain
                        ) {
                            setupMobileCatalogNavigation();
                        }
                    } else {
                        document.body.style.overflow = "";
                        document.body.classList.remove("menu-open");
                    }
                } else {
                    // Optional: On wider screens, ensure menu is not active and body scroll is normal
                    // This might be redundant if the button is not intended to be functional on desktop
                    // or if CSS handles the menu visibility appropriately based on screen size.
                    // For now, the main goal is to prevent body scroll lock on desktop.
                    // If .catalog-btn might be active from a previous mobile interaction, ensure it's reset.
                    // mobileMenu.classList.remove("active");
                    // allCatalogBtns.forEach(cb => cb.classList.remove("active"));
                    // document.body.style.overflow = "";
                    // document.body.classList.remove("menu-open");
                }
            });
        });
    }

    // Order Form Delivery Interaction - Updated for multiple instances
    const allDeliveryContainers = document.querySelectorAll('.order-form-delivery');
    allDeliveryContainers.forEach(deliveryContainer => {
        // Select elements *within* the current deliveryContainer
        const deliveryDefault = deliveryContainer.querySelector('.order-form-delivery__default');
        const deliveryDefaultText = deliveryDefault?.querySelector('.order-form-delivery__text'); // Use optional chaining
        const deliveryList = deliveryContainer.querySelector('.order-form-delivery-list');
        const deliveryListInput = deliveryList?.querySelector('.order-form-delivery-list__top input');
        const deliveryListDropdown = deliveryList?.querySelector('.order-form-delivery-list__dropdown');
        const deliveryListItems = deliveryListDropdown?.querySelectorAll('.order-form-delivery-list-item');

        // Check if all necessary elements exist for this instance
        if (!deliveryDefault || !deliveryDefaultText || !deliveryList || !deliveryListInput || !deliveryListDropdown || !deliveryListItems) {
            // console.warn('Skipping delivery interaction setup for one instance due to missing elements.');
            return; // Skip this container if essential elements are missing
        }

        // --- Set up listeners for this specific instance ---

        // Initial states
        deliveryDefault.style.display = 'flex';
        deliveryList.style.display = 'none';
        deliveryListDropdown.style.display = 'none';

        // Listener for clicking the default view
        deliveryDefault.addEventListener('click', () => {
            // Hide other open delivery lists before showing this one (optional, but good UX)
            allDeliveryContainers.forEach(otherContainer => {
                if (otherContainer !== deliveryContainer) {
                    const otherList = otherContainer.querySelector('.order-form-delivery-list');
                    const otherDefault = otherContainer.querySelector('.order-form-delivery__default');
                    const otherDropdown = otherContainer.querySelector('.order-form-delivery-list__dropdown');
                    const otherInput = otherContainer.querySelector('.order-form-delivery-list__top input');
                    if(otherList) otherList.style.display = 'none';
                    if(otherDefault) otherDefault.style.display = 'flex';
                    if(otherDropdown) otherDropdown.style.display = 'none';
                    if(otherInput) otherInput.value = '';
                }
            });
            
            // Show this instance's list and dropdown
            deliveryDefault.style.display = 'none';
            deliveryList.style.display = 'block';
            deliveryListDropdown.style.display = 'block';
        });

        // Listener for input changes (for filtering, if implemented later)
        deliveryListInput.addEventListener('input', () => {
            // This currently hides/shows based on input value. 
            // You might want to add actual filtering logic here later.
            if (deliveryListInput.value.trim().length > 0) {
                deliveryListDropdown.style.display = 'block';
            } else {
                 // Keep dropdown visible even if input is cleared, as it was opened by click
                 // deliveryListDropdown.style.display = 'none'; 
                 // If you want it to hide when input is empty, uncomment the line above.
            }
        });

        // Listener for clicking a dropdown item
        deliveryListItems.forEach(item => {
            item.addEventListener('click', function() {
                const selectedTextElement = this.querySelector('.order-form-delivery-list-item__text');
                if (selectedTextElement && deliveryDefaultText) {
                    deliveryDefaultText.textContent = selectedTextElement.textContent.trim();
                }

                // Hide the list and dropdown, show the default view for *this* instance
                deliveryList.style.display = 'none';
                deliveryListDropdown.style.display = 'none';
                deliveryDefault.style.display = 'flex';
                deliveryListInput.value = ''; // Clear the input field
            });
        });

        // Listener for input blur - Hide if focus moves outside the component
        deliveryListInput.addEventListener('blur', function(event) {
            // Use setTimeout to allow click events on dropdown items to register first
            setTimeout(() => {
                const activeElement = document.activeElement;
                // Check if the new active element is NOT the input itself and NOT inside the dropdown list
                if (activeElement !== deliveryListInput && !deliveryListDropdown.contains(activeElement)) {
                    deliveryList.style.display = 'none';
                    deliveryListDropdown.style.display = 'none';
                    deliveryDefault.style.display = 'flex';
                    deliveryListInput.value = '';
                }
            }, 0);
        });

    }); // End of forEach loop for delivery containers

    // Global click listener to close any open delivery list if clicked outside
    document.addEventListener('click', function(event) {
        allDeliveryContainers.forEach(container => {
            const list = container.querySelector('.order-form-delivery-list');
            // If the list is visible AND the click was outside its container
            if (list && list.style.display !== 'none' && !container.contains(event.target)) {
                const defaultView = container.querySelector('.order-form-delivery__default');
                const dropdown = container.querySelector('.order-form-delivery-list__dropdown');
                const input = container.querySelector('.order-form-delivery-list__top input');
                
                list.style.display = 'none';
                if(dropdown) dropdown.style.display = 'none';
                if(defaultView) defaultView.style.display = 'flex';
                if(input) input.value = '';
            }
        });
    });
    // Note: Removed the previous single-instance outside click/blur listeners 
    // as they are now handled within the loop or the new global listener.

    // Delivery Method Radio Button Logic
    const deliveryMethodItems = document.querySelectorAll('.order-get-method-item');
    deliveryMethodItems.forEach(item => {
        const radio = item.querySelector('input[type="radio"]');
        const form = item.querySelector('.order-get-method__form');

        if (radio && form) {
            // Initial state based on 'checked' and 'active' class in HTML
            if (!radio.checked) {
                form.classList.remove('active');
                form.style.display = 'none';
            } else {
                form.classList.add('active');
                form.style.display = 'flex';
            }

            radio.addEventListener('change', () => {
                // Hide all forms first
                document.querySelectorAll('.order-get-method__form').forEach(f => {
                    f.classList.remove('active');
                    f.style.display = 'none';
                });
                // Show the selected one
                if (radio.checked) {
                    form.classList.add('active');
                    form.style.display = 'flex';
                }
            });
        }
    });

    // IMPROVED FIX FOR CORPORATE PAYMENT FORM
    $(document).ready(function() {
        // Handle both payment form sections on the page
        handlePaymentForm('payThrough4', 'delivery-pay-group');
        handlePaymentForm('payThrough44', 'delivery-pay-group1');
        
        function handlePaymentForm(radioId, radioGroupName) {
            const corpPayRadio = $('#' + radioId);
            // Target the specific form that's a sibling of this radio's parent container
            const corpPayForm = corpPayRadio.closest('.order-get-method-item').find('.order-get-method__form-sp');
            
            if (corpPayRadio.length && corpPayForm.length) {
                // Initial state
                function updateFormVisibility() {
                    if (corpPayRadio.is(':checked')) {
                        corpPayForm.show().css('display', 'flex');
                        corpPayForm.addClass('active');
                    } else {
                        corpPayForm.hide();
                        corpPayForm.removeClass('active');
                    }
                }
                
                // Set initial state
                updateFormVisibility();
                
                // Listen for any change to any radio in the payment group
                $('input[name="' + radioGroupName + '"]').change(function() {
                    updateFormVisibility();
                });
            }
        }
        
        // VIN Field Toggle
        const vinFieldBox = $('.vin-field-box');
        const rememberVinCheckbox = $('#rememberVin');
        
        if (vinFieldBox.length && rememberVinCheckbox.length) {
            // Set initial state (hide by default)
            vinFieldBox.hide();
            
            // Toggle visibility when checkbox changes
            rememberVinCheckbox.on('change', function() {
                if ($(this).is(':checked')) {
                    vinFieldBox.show();
                } else {
                    vinFieldBox.hide();
                }
            });
            
            // Force re-evaluation of initial state (in case page loads with checkbox checked)
            rememberVinCheckbox.trigger('change');
        }
    });

    // Setup counter functionality for basket items
    const counterComponents = document.querySelectorAll('.popup-basket-item-counter');
    
    counterComponents.forEach(counter => {
        const minusButton = counter.querySelector('.popup-basket-item-counter__minus');
        const plusButton = counter.querySelector('.popup-basket-item-counter__plus');
        const counterDisplay = counter.querySelector('.popup-basket-item-counter__counter');
        
        if (minusButton && plusButton && counterDisplay) {
            // Minus button click handler
            minusButton.addEventListener('click', () => {
                let count = parseInt(counterDisplay.textContent);
                if (count > 1) {
                    count--;
                    counterDisplay.textContent = count;
                }
            });
            
            // Plus button click handler
            plusButton.addEventListener('click', () => {
                let count = parseInt(counterDisplay.textContent);
                count++;
                counterDisplay.textContent = count;
            });
        }
    });

    // Add heart block click handler
    document.querySelectorAll('.popular-item-heart').forEach(heartBlock => {
        heartBlock.addEventListener('click', function() {
            const icon = this.querySelector('.popular-item-heart__icon');
            const tooltip = this.querySelector('.popular-item-heart__tooltip');
            
            // Toggle active class
            if (icon) {
                icon.classList.toggle('active');
            }
            
            // Update tooltip text
            if (tooltip) {
                tooltip.textContent = icon.classList.contains('active') ? 'добавлено' : 'в избранное';
            }
        });
    });

    // Scroll to top functionality
    const scrollButton = $('<button>', {
        class: 'scroll-to-top',
        html: '<svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2066 8.20662C14.0191 8.39389 13.7649 8.49908 13.4999 8.49908C13.2349 8.49908 12.9807 8.39389 12.7932 8.20662L7.4999 2.91329L2.20657 8.20662C2.11502 8.30487 2.00462 8.38368 1.88196 8.43833C1.75929 8.49299 1.62687 8.52238 1.4926 8.52475C1.35833 8.52712 1.22496 8.50242 1.10044 8.45212C0.975923 8.40183 0.862812 8.32697 0.767854 8.23201C0.672895 8.13705 0.598035 8.02394 0.547741 7.89942C0.497446 7.7749 0.472746 7.64153 0.475115 7.50726C0.477484 7.37299 0.506873 7.24057 0.561529 7.11791C0.616185 6.99524 0.694989 6.88484 0.793238 6.79329L6.79324 0.793292C6.98074 0.606025 7.2349 0.500838 7.4999 0.500838C7.7649 0.500838 8.01907 0.606025 8.20657 0.793292L14.2066 6.79329C14.3938 6.98079 14.499 7.23496 14.499 7.49996C14.499 7.76496 14.3938 8.01912 14.2066 8.20662Z" fill="#1B78D3"/></svg>'
    });
    
    $('body').append(scrollButton);

    // Show/hide button based on scroll position
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            scrollButton.addClass('visible');
        } else {
            scrollButton.removeClass('visible');
        }
    });

    // Scroll to top when clicked
    scrollButton.click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // Load Inputmask plugin
    const inputmaskScript = document.createElement('script');
    inputmaskScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.8/jquery.inputmask.min.js';
    document.head.appendChild(inputmaskScript);

    inputmaskScript.onload = function() {
        // Initialize phone masks for all tel inputs
        $('input[type="tel"]').inputmask('+38(099) 999-99-99', {
            placeholder: '_',
            showMaskOnHover: false,
            showMaskOnFocus: true,
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            autoUnmask: true
        });
    };

    // Garage input fields edit functionality
    $('.my-garage-correct-item').each(function() {
        const item = $(this);
        const input = item.find('input');
        const editIcon = item.find('.my-garage-correct-item__to-correct');
        const closeIcon = item.find('.my-garage-correct-item__to-close');

        // Enable editing on input focus or edit icon click
        input.on('focus', function() {
            item.addClass('active');
        });

        // Remove active class on input blur (unless clicking the close icon)
        input.on('blur', function(e) {
            // Небольшая задержка, чтобы успеть обработать клик по крестику
            setTimeout(function() {
                if (!$(e.relatedTarget).closest('.my-garage-correct-item__to-close').length) {
                    item.removeClass('active');
                }
            }, 100);
        });

        editIcon.on('click', function() {
            item.addClass('active');
            input.focus();
        });

        // Disable editing on close icon click
        closeIcon.on('click', function() {
            item.removeClass('active');
            input.blur();
        });
    });

    // VIN View Toggle Functionality
    $(document).ready(function() {
        // Hide profile-vin-content initially
        $('.profile-vin-content').hide();

        // Show content when clicking view button
        $('.vin-table-item__inner--view').click(function(e) {
            e.preventDefault();
            $('.profile-vin-tab').hide();
            $('.profile-vin-content').fadeIn(300);
        });

        // Hide content when clicking back button
        $('.vin-inner-btns .btn--transparent').click(function(e) {
            e.preventDefault();
            $('.profile-vin-content').hide();
            $('.profile-vin-tab').fadeIn(300);
        });
    });

    // Function to handle search form interactions
    function setupSearchForm(formId) {
        const $searchForm = $('form#' + formId);
        const $searchInput = $searchForm.find('input[name="search-field"]');
        const $searchList = $searchForm.find('.search-list');

        if ($searchInput.length && $searchList.length) {
            $searchList.hide();

            // При фокусе на input — показываем список и добавляем класс
            $searchInput.on('focus', function () {
                $searchList.show();
                $searchForm.addClass('active');
            });

            // При потере фокуса через timeout проверяем, ушёл ли фокус на список
            $searchInput.on('blur', function () {
                setTimeout(function () {
                    // Проверяем, не перешел ли фокус на один из элементов внутри $searchForm
                    if (!$(document.activeElement).closest($searchForm).length) {
                        $searchList.hide();
                        $searchForm.removeClass('active');
                    }
                }, 100); // даём время обработать фокус на других элементах
            });

            // Дополнительно, если кликнули на элемент списка, не скрывать список
            $searchList.on('mousedown', function(event) {
                // Этот обработчик предотвращает 'blur' на $searchInput, если клик был внутри $searchList
                // Это помогает сохранить список открытым, если пользователь кликает по его элементам.
                // event.preventDefault(); // Раскомментируйте, если нужно предотвратить стандартное поведение mousedown
            });
        }
    }

    // Initialize for both search forms
    setupSearchForm('search');
    setupSearchForm('search-other');

});

// Mobile-down bar visibility on scroll
document.addEventListener('DOMContentLoaded', () => {
    const mobileDownBar = document.querySelector('.mobile-down');
    if (!mobileDownBar) {
        return;
    }

    // Ensure it is initially visible by removing --hidden class, 
    // and also if already at top of page when loaded.
    if (window.scrollY === 0) {
        mobileDownBar.classList.remove('mobile-down--hidden');
    } // If scrolled down a bit on load, the scroll listener will handle it.

    let lastScrollY = window.scrollY;
    const scrollThreshold = 10; // Increased threshold slightly
    const showOffset = 50; // Only show if scrolled up past this amount from bottom, or scrolled up a bit from current pos

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
            return; 
        }

        const scrollingUp = currentScrollY < lastScrollY;
        const scrollingDown = currentScrollY > lastScrollY;

        if (scrollingDown) {
            mobileDownBar.classList.add('mobile-down--hidden');
        } else if (scrollingUp) {
            // Only show if not at the very top of the page.
            if (currentScrollY > 0) { 
                mobileDownBar.classList.remove('mobile-down--hidden');
            } else {
                // At the very top, ensure it's hidden.
                mobileDownBar.classList.add('mobile-down--hidden');
            }
        }
        
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    }, { passive: true });

    // Final check on load to ensure correct state based on initial scroll position
    if (window.scrollY > 0) {
        // If loaded page is already scrolled down, respect normal scroll logic
        // For example, if it was scrolled down more than lastScrollY, it should be hidden.
        // This part might need refinement based on exact desired load behavior when pre-scrolled.
        // For now, if it's not at the top, the default visible state from CSS will apply unless scrolled down.
    } else {
         mobileDownBar.classList.remove('mobile-down--hidden'); // Explicitly visible if at top on load
    }
});

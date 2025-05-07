$(document).ready(function () {
    // Инициализируем мобильное меню как активное сразу при загрузке для экранов меньше 830px
    if (window.innerWidth < 830) {
        const mobileMenu = document.querySelector(".mobile-menu");
        const catalogBtn = document.querySelector(".catalog-btn");
        if (mobileMenu) {
            mobileMenu.classList.add("active");
        }
        if (catalogBtn) {
            catalogBtn.classList.add("active");
        }
    }

    // Удаляем конфликтующий jQuery обработчик:
    $(".catalog-btn").on("click", function () {
        if ($(window).width() < 1024) {
            $(this).toggleClass("active"); // Тогглим класс у самой .catalog-btn
            $(".mobile-menu").toggleClass("active"); // Тогглим класс у .mobile-menu
        }
    });

    // Оставляем и модифицируем этот обработчик:
    const catalogButton = document.querySelector(".catalog-btn");
    if (catalogButton) {
        catalogButton.addEventListener("click", function () {
            if (window.innerWidth < 1024) {
                this.classList.toggle("active"); // toggle самому .catalog-btn
                const mobileMenu = document.querySelector(".mobile-menu");
                if (mobileMenu) {
                    mobileMenu.classList.toggle("active");
                }
            }
        });
    }
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

    // TABS FOR PICK
    const tabs = document.querySelectorAll(".pick-tabs-top__item");
    const tabItems = document.querySelectorAll(".pick-tab-content-item");

    // Определим текущую ширину экрана один раз при загрузке
    const isDesktop = window.innerWidth > 1024;

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            if (isDesktop) {
                // Удаляем active у всех табов
                tabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");

                // Показываем соответствующий контент
                tabItems.forEach((item) => {
                    item.style.display = "none";
                    item.style.opacity = 0;
                });

                const target = tabItems[index];
                target.style.display = "grid";

                setTimeout(() => {
                    target.style.opacity = 1;
                    target.style.transition = "opacity 0.3s ease";
                }, 10);
            } else {
                // На мобильных — просто переключаем active (toggle)
                if (tab.classList.contains("active")) {
                    tab.classList.remove("active");
                } else {
                    tabs.forEach((t) => t.classList.remove("active"));
                    tab.classList.add("active");
                }
            }
        });
    });

    // При загрузке: активируем первый таб и контент, только если десктоп
    if (isDesktop && tabs[0] && tabItems[0]) {
        tabs[0].classList.add("active");
        tabItems[0].style.display = "grid";
        tabItems[0].style.opacity = 1;
    }

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

            // Проверяем, что это действительно текстовый блок
            if (textBlock.classList.contains("catalog-info__text")) {
                // Получаем полную высоту контента
                const fullHeight = textBlock.scrollHeight;

                // Устанавливаем новую высоту с анимацией
                textBlock.style.maxHeight = `${fullHeight}px`;
                textBlock.style.transition = "max-height 0.4s ease";

                // Делаем кнопку прозрачной
                this.style.opacity = "0";
                this.style.transition = "opacity 0.4s ease";

                // Удаляем кнопку после завершения анимации
                setTimeout(() => {
                    this.remove();
                }, 400);
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

                // Сохраняем оригинальный src в data-src и заменяем src на пустышку
                img.dataset.src = originalSrc;
                img.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
        });

        // Функция загрузки с IntersectionObserver
        const lazyLoad = () => {
            // Создаем наблюдатель
            if ("IntersectionObserver" in window) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const img = entry.target;

                                // Загружаем изображение, если есть data-src
                                if (img.dataset.src) {
                                    const newImg = new Image();
                                    newImg.src = img.dataset.src;

                                    newImg.onload = () => {
                                        img.src = img.dataset.src;
                                        img.classList.add("loaded");
                                        img.removeAttribute("data-src");
                                    };

                                    newImg.onerror = () => {
                                        img.src =
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                                        img.style.opacity = "0.3";
                                    };

                                    // Прекращаем наблюдение
                                    observer.unobserve(img);
                                }
                            }
                        });
                    },
                    {
                        rootMargin: "50px 0px",
                        threshold: 0.1,
                    }
                );

                // Наблюдаем за всеми изображениями с классом lazy
                document.querySelectorAll("img.lazy").forEach((img) => {
                    observer.observe(img);
                });
            }
            // Запасной вариант для старых браузеров
            else {
                // Загрузка всех изображений сразу для старых браузеров
                document.querySelectorAll("img.lazy").forEach((img) => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add("loaded");
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
        document.querySelectorAll("[data-popup]").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                // Предотвратить повторное открытие изнутри попапа
                if (this.closest(".popup")) return;

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
            backButton.style.cssText =
                "padding: 10px 15px; cursor: pointer; border-bottom: 1px solid var(--color-gray-light); display: flex; align-items: center; gap: 5px;";
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
                catalogMainText.textContent = navigationPath[0]; // "Каталог"
            } else if (currentLevel === 2) {
                // Viewing subcategories of navigationPath[1]
                catalogMainText.textContent = navigationPath[0]; // "Каталог"
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
                        ).style.display = "block";
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
                    .forEach((link) => (link.style.display = "block"));
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

    window.addEventListener("load", setupMobileCatalogNavigation);
    window.addEventListener("resize", setupMobileCatalogNavigation);
    // Mobile Menu Toggle
    const catalogBtn = document.querySelector(".catalog-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (catalogBtn && mobileMenu) {
        catalogBtn.addEventListener("click", function () {
            // Check if the click is on the burger icon itself or its parent button
            // This prevents the menu from closing if something inside .catalog-window (part of mobile menu) is clicked
            // and that click somehow bubbles up to catalogBtn (though less likely with current structure).
            // More importantly, this ensures we are toggling based on the main burger button interaction.

            const isOpening = !mobileMenu.classList.contains("active");

            catalogBtn.classList.toggle("active");
            mobileMenu.classList.toggle("active");

            if (isOpening) {
                // Optional: Prevent body scroll when menu is open
                document.body.style.overflow = "hidden";
                // Reset mobile catalog navigation to level 1 when opening
                if (
                    typeof setupMobileCatalogNavigation === "function" &&
                    window.innerWidth < 830
                ) {
                    // Temporarily set navigationPath to ensure level 1 is displayed
                    // This assumes navigationPath is accessible or setupMobileCatalogNavigation handles it.
                    // For a cleaner approach, setupMobileCatalogNavigation could have a reset function.
                    // Directly manipulating its internal state from here is not ideal but works for a simple reset.
                    const catalogCurrent = mobileMenu.querySelector(
                        ".mobile-menu-bottom .catalog-current .catalog-main"
                    );
                    if (catalogCurrent) catalogCurrent.click(); // Simulate click on "Каталог" if available and clickable
                }
            } else {
                // Optional: Restore body scroll when menu is closed
                document.body.style.overflow = "";
            }
        });
    }

    // Order Form Delivery Interaction
    const deliveryContainer = document.querySelector('.order-form-delivery');
    if (deliveryContainer) {
        const deliveryDefault = deliveryContainer.querySelector('.order-form-delivery__default');
        const deliveryList = deliveryContainer.querySelector('.order-form-delivery-list');
        const deliveryListInput = deliveryList.querySelector('.order-form-delivery-list__top input');
        const deliveryListDropdown = deliveryList.querySelector('.order-form-delivery-list__dropdown');

        // Initial states
        if (deliveryDefault) deliveryDefault.style.display = 'flex';
        if (deliveryList) deliveryList.style.display = 'none';
        if (deliveryListDropdown) deliveryListDropdown.style.display = 'none';

        if (deliveryDefault && deliveryList && deliveryListInput) {
            deliveryDefault.addEventListener('click', () => {
                deliveryDefault.style.display = 'none';
                deliveryList.style.display = 'block'; // Or appropriate display type
                deliveryListInput.focus();
                if (deliveryListDropdown) deliveryListDropdown.style.display = 'none'; // Ensure dropdown is hidden
            });
        }

        if (deliveryListInput && deliveryListDropdown) {
            deliveryListInput.addEventListener('input', () => {
                if (deliveryListInput.value.trim().length > 0) {
                    deliveryListDropdown.style.display = 'block'; // Or appropriate display type
                } else {
                    deliveryListDropdown.style.display = 'none';
                }
            });
        }

        if (deliveryList && deliveryDefault && deliveryListInput && deliveryListDropdown) {
            // Use a document-level click listener to handle "blur" more effectively
            document.addEventListener('click', function(event) {
                // Check if the deliveryList is visible and the click is outside the deliveryContainer
                if (deliveryList.style.display !== 'none' && !deliveryContainer.contains(event.target)) {
                    deliveryList.style.display = 'none';
                    deliveryDefault.style.display = 'flex';
                    deliveryListDropdown.style.display = 'none';
                    deliveryListInput.value = ''; // Clear input
                }
            });

            // If the input itself loses focus to something outside the list container, also switch back.
            // This handles tabbing out.
            deliveryListInput.addEventListener('blur', function(event) {
                // Timeout to allow click on dropdown items to proceed
                setTimeout(() => {
                    const activeElement = document.activeElement;
                    if (!deliveryList.contains(activeElement)) {
                        deliveryList.style.display = 'none';
                        deliveryDefault.style.display = 'flex';
                        deliveryListDropdown.style.display = 'none';
                        deliveryListInput.value = ''; // Clear input
                    }
                }, 0);
            });
        }
    }

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
                form.style.display = 'block';
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
                    form.style.display = 'block';
                }
            });
        }
    });

    // --- Tabs for .order-item-auth ---
    var $authOrderTabs = $('.order-item-auth__top .order-item-auth__tab');
    var $authOrderContentTabs = $('.order-item-auth__content .order-item-auth__content-tab');

    function switchAuthOrderTab(tabIndex) {
        if (tabIndex < 0 || tabIndex >= $authOrderTabs.length) {
            console.warn('Auth order tab index out of bounds:', tabIndex);
            return;
        }
        $authOrderTabs.removeClass('active');
        $authOrderTabs.eq(tabIndex).addClass('active');
        
        $authOrderContentTabs.hide(); // Or use a class like .hidden and toggle it
        if (tabIndex < $authOrderContentTabs.length) {
            $authOrderContentTabs.eq(tabIndex).show(); // Or remove .hidden
        } else {
            console.warn('No corresponding content tab for auth order tab index:', tabIndex);
        }
    }

    if ($authOrderTabs.length > 0) {
        $authOrderTabs.on('click', function() {
            var clickedIndex = $(this).index();
            switchAuthOrderTab(clickedIndex);
        });

        var initialActiveOrderIndex = $authOrderTabs.filter('.active').index();
        
        if (initialActiveOrderIndex === -1 && $authOrderTabs.length > 0) {
            initialActiveOrderIndex = 0; // Default to the first tab if no tab has 'active' class
        }

        // Ensure only the correct tab and content are active/visible initially
        if (initialActiveOrderIndex !== -1) {
             // First, ensure all are in a consistent state (all tabs inactive, all content hidden)
            $authOrderTabs.removeClass('active');
            $authOrderContentTabs.hide();
            // Then, activate the determined initial tab and its content
            switchAuthOrderTab(initialActiveOrderIndex);
        } else if ($authOrderContentTabs.length > 0) {
            // Fallback if no active tab and no tabs at all, but content exists (unlikely scenario)
            // Hide all content except the first one by default if no tabs are present to control them.
            $authOrderContentTabs.hide().first().show();
        }
    }
    // --- End Tabs for .order-item-auth ---
});

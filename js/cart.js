document.addEventListener('DOMContentLoaded', function () {
  const thumbsSwiper = new Swiper('.cart-view__more', {
    slidesPerView: 3,
    spaceBetween: 10,
    watchSlidesProgress: true,
  });

  const mainSwiper = new Swiper('.cart-view__main', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true, // Автоматическая высота
    thumbs: {
      swiper: thumbsSwiper,
    },
  });

// Для вкладок отзывов
$("section .cart-other-review-tab").click(function() {
    var section = $(this).closest('section');
    section.find(".cart-other-review-tab").removeClass("active").eq($(this).index()).addClass("active");
    section.find(".cart-other-review-tabs-content__item").hide().eq($(this).index()).fadeIn();
}).each(function() {
    // Активируем первую вкладку в каждой секции
    var section = $(this).closest('section');
    if (section.find(".cart-other-review-tab.active").length === 0) {
        section.find(".cart-other-review-tab").eq(0).addClass("active");
        section.find(".cart-other-review-tabs-content__item").hide().eq(0).fadeIn();
    }
});

// Для вкладок "Также интересно"
$("section .also-interest-tab").click(function() {
    var section = $(this).closest('section');
    section.find(".also-interest-tab").removeClass("active").eq($(this).index()).addClass("active");
    section.find(".also-tabs-content-item").hide().eq($(this).index()).fadeIn();
}).each(function() {
    // Активируем первую вкладку в каждой секции
    var section = $(this).closest('section');
    if (section.find(".also-interest-tab.active").length === 0) {
        section.find(".also-interest-tab").eq(0).addClass("active");
        section.find(".also-tabs-content-item").hide().eq(0).fadeIn();
    }
});


 const navLinks = document.querySelectorAll('.cart-nav__item[href^="#"]');
  const sections = [];

  navLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    if (section) {
      sections.push({ id, section, link });
    }
  });

  let manualActiveId = null;
  let userScrolledAfterClick = false;
  let lastScrollY = window.scrollY;

  function setActive(link) {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const id = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(id);

      if (targetSection) {
        manualActiveId = id;
        userScrolledAfterClick = false;

        setActive(link);

        // Плавная прокрутка
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  function onScroll() {
    const scrollY = window.scrollY;

    // Если пользователь сделал прокрутку после клика
    if (manualActiveId && !userScrolledAfterClick) {
      if (Math.abs(scrollY - lastScrollY) > 5) {
        manualActiveId = null; // отменяем ручной выбор
        userScrolledAfterClick = true;
      } else {
        // пока не прокрутил — оставляем активный как есть
        lastScrollY = scrollY;
        return;
      }
    }

    // Только если не в "ручном" режиме — определяем активную секцию по скроллу
    if (!manualActiveId) {
      const scrollPosition = scrollY + window.innerHeight / 2;
      let currentSection = sections[0];

      for (const sec of sections) {
        const offsetTop = sec.section.getBoundingClientRect().top + window.scrollY;
        if (offsetTop <= scrollPosition) {
          currentSection = sec;
        }
      }

      if (currentSection && currentSection.link) {
        setActive(currentSection.link);
      }
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
  
 $(".cart-like").click(function() {
	$(this).toggleClass('active');
 })

   const copyBlocks = document.querySelectorAll('.cart-other-analog__copy');

  copyBlocks.forEach(block => {
    block.addEventListener('click', () => {
      const text = block.querySelector('.cart-other-analog-copy__text')?.innerText;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          // ✅ Успешное копирование
          block.classList.add('copied');

          // Можно добавить визуальную подсказку, например смену текста или иконки
          setTimeout(() => {
            block.classList.remove('copied');
          }, 1500);
        }).catch(err => {
          console.error('Помилка копіювання:', err);
        });
      }
    });
  });

    const fillLines = document.querySelectorAll('.cart-other-review__line--fill');

  fillLines.forEach(line => {
    const percent = line.dataset.percent;
    if (percent !== undefined) {
      line.style.width = percent + '%';
    }
  });


(function($) {
    $.fn.imageZoom = function(options) {
        var settings = $.extend({
            lensSize: {width: 100, height: 100},
            zoomSize: {width: 300, height: 300},
            zoomOffsetX: 15,
            zoomOffsetY: 15,
            borderColor: '#888',
            borderWidth: 1,
            zoomLensOpacity: 0.4,
            zoomLevel: 2,
            zoomContainer: null
        }, options);

        // Нормализация размеров
        if (typeof settings.lensSize === 'number') {
            settings.lensSize = {width: settings.lensSize, height: settings.lensSize};
        }
        if (typeof settings.zoomSize === 'number') {
            settings.zoomSize = {width: settings.zoomSize, height: settings.zoomSize};
        }

        return this.each(function(index) {
            var $img = $(this);
            var img = new Image();
            img.src = $img.attr('src');
            
            function parseSize(value, base) {
                if (typeof value === 'string' && value.indexOf('%') > -1) {
                    return base * parseFloat(value) / 100;
                }
                return parseFloat(value);
            }
            
            // Ждем загрузки изображения
            $(img).on('load', function() {
                var imgWidth = img.width;
                var imgHeight = img.height;
                var actualZoomSize = {
                    width: parseSize(settings.zoomSize.width, $img.width()),
                    height: parseSize(settings.zoomSize.height, $img.height())
                };
                
                // Создаем линзу для этого изображения
                var zoomLens = $('<div class="zoom-lens" data-index="'+index+'"></div>').css({
                    position: 'absolute',
                    border: settings.borderWidth + 'px solid ' + settings.borderColor,
                    backgroundColor: 'white',
                    opacity: settings.zoomLensOpacity,
                    pointerEvents: 'none',
                    display: 'none',
                    width: settings.lensSize.width + 'px',
                    height: settings.lensSize.height + 'px',
                    zIndex: '100'
                });
                
                $('body').append(zoomLens);
                
                // Находим или создаем canvas для этого изображения
                var zoomWindow = $(settings.zoomContainer);
                var zoomCanvas = zoomWindow.find('canvas').eq(index);
                
                // Если canvas для этого индекса не существует - создаем
                if (zoomCanvas.length === 0) {
                    zoomCanvas = $('<canvas></canvas>').css({
                        width: actualZoomSize.width + 'px',
                        height: actualZoomSize.height + 'px'
                    });
                    zoomWindow.append(zoomCanvas);
                }
                
                var zoomContext = zoomCanvas[0].getContext('2d');
                zoomCanvas[0].width = actualZoomSize.width;
                zoomCanvas[0].height = actualZoomSize.height;
                
                // Прячем все canvas кроме текущего
                zoomWindow.find('canvas').hide();
                
                $img.on('mousemove', function(e) {
                    if (!img.complete) return;
                    
                    // Показываем только соответствующий canvas
                    zoomWindow.find('canvas').hide();
                    zoomCanvas.show();
                    
                    var posX = e.pageX - $img.offset().left;
                    var posY = e.pageY - $img.offset().top;
                    
                    var lensX = posX - settings.lensSize.width / 2;
                    var lensY = posY - settings.lensSize.height / 2;
                    
                    lensX = Math.max(0, Math.min(lensX, $img.width() - settings.lensSize.width));
                    lensY = Math.max(0, Math.min(lensY, $img.height() - settings.lensSize.height));
                    
                    zoomLens.css({
                        left: $img.offset().left + lensX,
                        top: $img.offset().top + lensY,
                        display: 'block'
                    });
                    
                    var sourceX = lensX * (imgWidth / $img.width());
                    var sourceY = lensY * (imgHeight / $img.height());
                    var sourceWidth = settings.lensSize.width * (imgWidth / $img.width());
                    var sourceHeight = settings.lensSize.height * (imgHeight / $img.height());
                    
                    zoomContext.clearRect(0, 0, actualZoomSize.width, actualZoomSize.height);
                    zoomContext.drawImage(
                        img,
                        sourceX, sourceY, sourceWidth, sourceHeight,
                        0, 0, actualZoomSize.width, actualZoomSize.height
                    );
                    
                    zoomWindow.css('display', 'block');
                });
                
                $img.on('mouseleave', function() {
                    zoomLens.hide();
                    zoomWindow.hide();
                });
            });
        });
    };
})(jQuery);

// Инициализация для всех изображений
function initImageZoom() {
    if ($(window).width() > 768) {
        $('.zoom-image').imageZoom({
            lensSize: {width: 200, height: 200},
            zoomSize: {width: '100%', height: 650},
            zoomContainer: '.cart-main-info-to-show'
        });
    }
}

// Инициализация при загрузке
$(document).ready(function() {
    initImageZoom();
});

// Повторная инициализация при изменении размера окна
$(window).resize(function() {
    // Сначала удаляем предыдущую инициализацию (если нужно)
    $('.zoom-image').removeData('imageZoom');
    
    // Инициализируем заново
    initImageZoom();
});
// Сохраняем оригинальный заголовок при загрузке страницы
var originalTitle = $('h1.cart-top__title').text();

// Обработчик клика на "Більше цін"
$('#cart-nav-more').on('click', function(e) {
    e.preventDefault();
    
    // Скрываем все основные блоки
    $('.cart-main, .buy-more, .popular, .all-ques, .cart-other').hide();
    
    // Показываем только блок с ценами
    $('.more-prices').show();
    
    // Обновляем активный элемент навигации
    updateActiveNav($(this));
    
    var questionsTitle = $('.more-prices .cart-top__title--swap').text();
    $('h1.cart-top__title').text(questionsTitle);
});

// Обработчик клика на "Відгуки та запитання"
$('#cart-nav-reviews').on('click', function(e) {
    e.preventDefault();
    
    // Скрываем все основные блоки
    $('.cart-main, .buy-more, .popular, .more-prices, .cart-other').hide();
    
    // Показываем только блок с вопросами
    $('.all-ques').show();
    
    // Обновляем активный элемент навигации
    updateActiveNav($(this));
    
    // Берем заголовок из блока вопросов и подставляем в основной заголовок
    var questionsTitle = $('.all-ques .cart-top__title--swap').text();
    $('h1.cart-top__title').text(questionsTitle);
});

// Обработчик клика на другие элементы навигации
$('.cart-nav__item:not(#cart-nav-more, #cart-nav-reviews)').on('click', function(e) {
    e.preventDefault();
    
    // Показываем все основные блоки
    $('.cart-main, .buy-more, .popular, .all-ques, .cart-other').show();
    
    // Скрываем специальные блоки
    $('.more-prices, .all-ques').hide();
    
    // Обновляем активный элемент навигации
    updateActiveNav($(this));
    
    // Возвращаем оригинальный заголовок
    $('h1.cart-top__title').text(originalTitle);
    
    // Прокручиваем к целевому разделу
    scrollToTarget($(this));
});

// Функция для обновления активного элемента навигации
function updateActiveNav($element) {
    $('.cart-nav__item').removeClass('active');
    $element.addClass('active');
}

// Функция для плавной прокрутки к целевому разделу
function scrollToTarget($element) {
    var target = $element.attr('href');
    if (target && target !== '#') {
        $(target).get(0)?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Инициализация при загрузке страницы
$(function() {
    // Сохраняем оригинальный заголовок
    originalTitle = $('h1.cart-top__title').text();
    
    // Если активна вкладка "Відгуки та запитання" при загрузке
    if ($('#cart-nav-reviews').hasClass('active')) {
        var questionsTitle = $('.all-ques .cart-top__title--swap').text();
        $('h1.cart-top__title').text(questionsTitle);
    }
});
});

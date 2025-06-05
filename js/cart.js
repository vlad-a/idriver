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

  $(".cart-other-review-tab").click(function() {
	$(".cart-other-review-tab").removeClass("active").eq($(this).index()).addClass("active");
	$(".cart-other-review-tabs-content__item").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");

  $(".also-interest-tab").click(function() {
	$(".also-interest-tab").removeClass("active").eq($(this).index()).addClass("active");
	$(".also-tabs-content-item").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");

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
});

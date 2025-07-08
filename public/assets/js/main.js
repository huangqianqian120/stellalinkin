console.log('main.js loaded');/**
/**
* Template Name: Dewi
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  var navmenuLinks = document.querySelectorAll('#navmenu a');
  if (navmenuLinks && navmenuLinks.length) {
    navmenuLinks.forEach(function(navmenu) {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });
  }

  /**
   * Toggle mobile nav dropdowns
   */
  var navmenuDropdowns = document.querySelectorAll('.navmenu .toggle-dropdown');
  if (navmenuDropdowns && navmenuDropdowns.length) {
    navmenuDropdowns.forEach(function(navmenu) {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener('DOMContentLoaded', function() {
    // 手机号前端校验（如有手机号输入框）
    var phoneInput = document.querySelector('input[name="phone"]');
    if(phoneInput) {
      phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d]/g, '').slice(0,11);
      });
      phoneInput.addEventListener('blur', function() {
        var reg = /^1[3-9]\d{9}$/;
        if(this.value && !reg.test(this.value)) {
          this.setCustomValidity('请输入11位有效手机号');
        } else {
          this.setCustomValidity('');
        }
      });
    }

    // 图片弹窗逻辑
    var meModal = document.getElementById('me-modal');
    var meModalClose = document.querySelector('.me-modal-close');
    function showMeModal() { if(meModal) meModal.style.display = 'flex'; }
    function hideMeModal() { if(meModal) meModal.style.display = 'none'; }
    if(meModalClose) meModalClose.addEventListener('click', hideMeModal);
    if(meModal) meModal.addEventListener('click', function(e) {
      if (e.target === meModal) hideMeModal();
    });
    // 移除 a[href='blog.html'] 相关绑定，统一用 .show-me-modal
    var showMeModalLinks = document.querySelectorAll('.show-me-modal');
    if (showMeModalLinks && showMeModalLinks.length) {
      showMeModalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          showMeModal();
        });
      });
    }
    var wechatBtn = document.querySelector('.footer .bi-wechat')?.parentElement;
    if (wechatBtn) {
      wechatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showMeModal();
      });
    }
    var linkedinBtn = document.querySelector('.footer .bi-linkedin')?.parentElement;
    if (linkedinBtn) linkedinBtn.remove();

    // 语言切换地球按钮和下拉菜单（事件委托，支持动态渲染）
    document.body.addEventListener('click', function(e) {
      if (e.target.classList.contains('lang-toggle')) {
        e.stopPropagation();
        var dropdown = e.target.nextElementSibling;
        if (dropdown && dropdown.classList.contains('lang-dropdown')) {
          document.querySelectorAll('.lang-dropdown.active').forEach(function(d){d.classList.remove('active');});
          dropdown.classList.toggle('active');
        }
      } else {
        document.querySelectorAll('.lang-dropdown.active').forEach(function(d){d.classList.remove('active');});
      }
    });

    // 其他 addEventListener 绑定前也加 null 判断
    var mobileNavToggle = document.getElementById('mobile-nav-toggle');
    var mobileNavMenu = document.getElementById('mobile-nav-menu');
    if (mobileNavToggle && mobileNavMenu) {
      mobileNavToggle.addEventListener('click', function() {
        mobileNavMenu.classList.toggle('active');
      });
      mobileNavMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          mobileNavMenu.classList.remove('active');
        });
      });
    }

    console.log('lang-toggle binding start');
     // 事件绑定代码
     console.log('lang-toggle binding end');

    // 初始化 GLightbox
    if (typeof GLightbox !== 'undefined') {
      const glightbox = GLightbox({
        selector: '.glightbox'
      });
    }
  });

})();
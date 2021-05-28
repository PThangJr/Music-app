const carousel = () => {
  const trendingControls = document.querySelectorAll('.trending-control');
  const trendingItems = document.querySelectorAll('.trending-item');
  const trendingList = document.querySelector('.trending-list');
  const trendingPrev = document.querySelector('.trending__prev');
  const trendingNext = document.querySelector('.trending__next');
  const trendingActive = document.querySelector('.trending-item--active');

  var activeSlide = 0;
  var prevSlide = 0;
  const slideDuration = 0.5;
  var statusChangeSlide = true;
  var autoSlideDuration = 4.5;
  var statusAutoSlide = true;

  const changeSlide = () => {
    autoSlideDuration = 4;
    for (let i = 0; i < trendingItems.length; i++) {
      if (trendingItems[i].classList.contains('trending-item--active')) {
        activeSlide = i;
      }
      trendingControls[i].classList.remove('trending-control--active');
    }
    setTimeout(() => {
      trendingItems[activeSlide].classList.remove('trending-item--active');
      for (trendingItem of trendingItems) {
        trendingItem.style.animation = '';
      }
      statusChangeSlide = true;
    }, slideDuration * 1000);
  };

  const handleNextSlide = (e) => {
    if (!statusChangeSlide) return;
    changeSlide();

    var nextSlide = activeSlide + 1;

    if (activeSlide === trendingItems.length - 1) {
      nextSlide = 0;
    }
    trendingItems[activeSlide].style.animation = `trending-prev-hide ${slideDuration}s forwards`;

    trendingItems[nextSlide].classList.add('trending-item--active');
    trendingItems[nextSlide].style.animation = `trending-next-show ${slideDuration}s forwards`;
    trendingControls[nextSlide].classList.add('trending-control--active');

    statusChangeSlide = false;
  };
  const handlePrevSlide = () => {
    if (!statusChangeSlide) return;

    changeSlide();

    var nextSlide = activeSlide - 1;
    trendingItems[activeSlide].style.animation = `trending-next-hide ${slideDuration}s forwards`;

    if (activeSlide === 0) {
      nextSlide = trendingItems.length - 1;
    }

    trendingItems[nextSlide].classList.add('trending-item--active');
    trendingItems[nextSlide].style.animation = `trending-prev-show ${slideDuration}s forwards`;
    trendingControls[nextSlide].classList.add('trending-control--active');

    statusChangeSlide = false;
  };
  const setTimeOutSlide = () => {
    statusAutoSlide = false;
    setTimeout(() => {
      statusAutoSlide = true;
    }, autoSlideDuration * 1000);
  };
  trendingNext.addEventListener('click', () => {
    setTimeOutSlide();
    handleNextSlide();
  });
  trendingPrev.addEventListener('click', () => {
    setTimeOutSlide();
    handlePrevSlide();
  });

  const nextControl = (i) => {
    if (!statusChangeSlide) return;
    for (let i = 0; i < trendingControls.length; i++) {
      trendingControls[i].classList.remove('trending-control--active');
    }
    trendingControls[i].classList.add('trending-control--active');

    for (let i = 0; i < trendingItems.length; i++) {
      if (trendingItems[i].classList.contains('trending-item--active')) {
        activeSlide = i;
      }
    }

    statusChangeSlide = false;

    prevSlide = activeSlide;
    trendingControls[i].classList.add('trending-control--active');
    activeSlide = i;
    var changeSlide = 0;
    if (prevSlide < activeSlide) {
      for (let i = prevSlide; i <= activeSlide; i++) {
        trendingItems[i].classList.add('trending-item--active');
        trendingItems[i].style.transform = `translateX(${changeSlide * 100}%)`;
        changeSlide++;
      }
      trendingList.style.transform = `translateX(-${(activeSlide - prevSlide) * 100}%)`;
      trendingList.style.transition = `${slideDuration}s`;
      setTimeout(() => {
        for (let i = prevSlide; i <= activeSlide; i++) {
          trendingItems[i].style.transform = `none`;
          trendingList.style.transform = `none`;
          trendingList.style.transition = `none`;
          trendingItems[i].classList.remove('trending-item--active');
          if (i === activeSlide) {
            trendingItems[i].classList.add('trending-item--active');
          }
        }
        changeSlide = 0;
        statusChangeSlide = true;
      }, slideDuration * 1000);
    } else if (prevSlide > activeSlide) {
      for (let i = prevSlide; i >= activeSlide; i--) {
        trendingItems[i].classList.add('trending-item--active');
        trendingItems[i].style.transform = `translateX(-${changeSlide * 100}%)`;
        changeSlide++;
      }
      trendingList.style.transform = `translateX(${(prevSlide - activeSlide) * 100}%)`;
      trendingList.style.transition = `${slideDuration}s`;
      setTimeout(() => {
        for (let i = prevSlide; i >= activeSlide; i--) {
          trendingItems[i].style.transform = `none`;
          trendingList.style.transform = `none`;
          trendingList.style.transition = `none`;
          trendingItems[i].classList.remove('trending-item--active');
          if (i === activeSlide) {
            trendingItems[i].classList.add('trending-item--active');
          }
        }
        changeSlide = 0;
        statusChangeSlide = true;
      }, slideDuration * 1000);
    } else if (prevSlide === activeSlide) {
      setTimeout(() => {
        statusChangeSlide = true;
      }, slideDuration * 1000);
    }
  };

  for (let i = 0; i < trendingControls.length; i++) {
    trendingControls[i].addEventListener('click', () => {
      nextControl(i);
      setTimeOutSlide();
    });
  }

  const autoSlide = setInterval(() => (statusAutoSlide ? handleNextSlide() : false), autoSlideDuration * 1000);
};
carousel();
const toggleSidebar = () => {
  const menuNavbar = document.querySelectorAll('.navbar__menu-icon')[0];
  const iconSearch = document.querySelectorAll('.navbar__menu-icon')[1];
  const sidebar = document.querySelector('.sidebar');
  const modalExit = document.querySelector('.modal-exit');
  const iconCloseSideBar = document.querySelector('.sidebar .icon-close');

  menuNavbar.addEventListener('click', () => {
    sidebar.classList.add('sidebar--show');
    modalExit.classList.remove('d-none');
  });
  iconSearch.addEventListener('click', () => {
    const search = document.querySelector('.search');
    search.classList.toggle('search--show-on-mobile');
  });
  const exitSidebar = () => {
    sidebar.classList.remove('sidebar--show');
    modalExit.classList.add('d-none');
  };
  iconCloseSideBar.addEventListener('click', exitSidebar);
  modalExit.addEventListener('click', exitSidebar);
};
toggleSidebar();

const darkMode = () => {
  const btnDarkMode = document.querySelector('.dark-mode');
  const darkModeBox = document.querySelector('.dark-mode__box');
  const darkModeName = document.querySelector('.dark-mode__name');
  const wrapper = document.querySelector('.wrapper');
  btnDarkMode.addEventListener('click', (e) => {
    darkModeBox.classList.toggle('dark-mode__box--active');
    wrapper.classList.toggle('dark-theme');
    if (darkModeName.innerText === 'Dark Mode') {
      darkModeName.innerText = 'Light Mode';
    } else {
      darkModeName.innerText = 'Dark Mode';
    }
  });
};
darkMode();

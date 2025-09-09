document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const profileImg = document.getElementById('profile-img');
  const profileDisplayName = document.getElementById('profile-display'); 
  const subtitle = document.getElementById('subtitle'); 
  const nameContainer = document.getElementById('name-container'); 
  const mainNameSpan = nameContainer ? nameContainer.querySelector('#main-name') : null; 

  const thresholdForInstantChange = 50; 
  const thresholdForFullSize = 40;      

  const animationStartScroll = 0;
  const animationEndScroll = 100; 

  let isNavbarSmallState = false; 

  let ticking = false; 

  function updateNavbar() {
    const scrollY = window.scrollY;

    const progressForSmoothAnimation = Math.min(1, Math.max(0, (scrollY - animationStartScroll) / (animationEndScroll - animationStartScroll)));

    if (subtitle) {
      const currentSubtitleOpacity = 1 - progressForSmoothAnimation;
      subtitle.style.opacity = `${currentSubtitleOpacity}`;
      subtitle.style.display = currentSubtitleOpacity <= 0.05 ? 'none' : 'block'; 
    }

    if (scrollY > thresholdForInstantChange && !isNavbarSmallState) {

      isNavbarSmallState = true;

      navbar.classList.remove('py-4');
      navbar.classList.add('py-1'); 

      profileImg.classList.remove('h-24', 'w-24'); 
      profileImg.classList.add('h-10', 'w-10');   

      if (mainNameSpan) {
          mainNameSpan.classList.remove('text-xl'); 
          mainNameSpan.classList.add('text-base', 'leading-tight'); 
      }
      
      profileDisplayName.classList.add('-translate-x-8'); 

    } else if (scrollY <= thresholdForFullSize && isNavbarSmallState) {
      
      isNavbarSmallState = false;

      navbar.classList.remove('py-1'); 
      navbar.classList.add('py-4'); 

      profileImg.classList.remove('h-10', 'w-10');
      profileImg.classList.add('h-24', 'w-24');

      if (mainNameSpan) {
          mainNameSpan.classList.remove('text-base', 'leading-tight');
          mainNameSpan.classList.add('text-xl');
      }

      profileDisplayName.classList.remove('-translate-x-8'); 
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavbar();
      });
      ticking = true;
    }
  });

  updateNavbar();
});
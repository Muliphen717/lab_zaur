// script.js
// ==================== КЛАСС ДЛЯ ПАДАЮЩИХ ЗУБОВ ====================
class FallingTooth {
  constructor(x, y) {
    this.element = document.createElement('div');
    this.element.className = 'falling-tooth';
    this.element.textContent = '🦷';
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
    document.body.appendChild(this.element);
    // Физические свойства
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 15; // Горизонтальная скорость
    this.vy = Math.random() * -10 - 5; // Начальная вертикальная скорость (вверх)
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 20;
    this.gravity = 0.5;
    this.bounce = 0.7; // Коэффициент отскока
    this.friction = 0.99;
    this.alive = true;
  }
  update() {
    // Применяем гравитацию
    this.vy += this.gravity;
    // Обновляем позицию
    this.x += this.vx;
    this.y += this.vy;
    // Обновляем вращение
    this.rotation += this.rotationSpeed;
    // Проверка столкновения с полом
    const windowHeight = window.innerHeight;
    if (this.y > windowHeight - 40) {
      this.y = windowHeight - 40;
      this.vy *= -this.bounce;
      this.rotationSpeed *= 0.8;
      // Если скорость очень маленькая, останавливаем
      if (Math.abs(this.vy) < 1) {
        this.vy = 0;
        this.vx *= 0.9;
      }
    }
    // Проверка столкновения со стенками
    const windowWidth = window.innerWidth;
    if (this.x < 0) {
      this.x = 0;
      this.vx *= -this.bounce;
    } else if (this.x > windowWidth - 40) {
      this.x = windowWidth - 40;
      this.vx *= -this.bounce;
    }
    // Применяем трение
    this.vx *= this.friction;
    // Обновляем DOM
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = `rotate(${this.rotation}deg)`;
    // Удаляем зуб если он остановился
    if (Math.abs(this.vx) < 0.1 && Math.abs(this.vy) < 0.1 && this.y >= windowHeight - 41) {
      this.alive = false;
    }
  }
  remove() {
    if (this.element && this.element.parentNode) {
      this.element.style.transition = 'opacity 0.5s';
      this.element.style.opacity = '0';
      setTimeout(() => {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }, 500);
    }
  }
}
// Массив для хранения всех зубов
let teeth = [];
let animationId = null;
// Анимационный цикл
function animateTeeth() {
  teeth = teeth.filter(tooth => {
    if (tooth.alive) {
      tooth.update();
      return true;
    } else {
      tooth.remove();
      return false;
    }
  });
  if (teeth.length > 0) {
    animationId = requestAnimationFrame(animateTeeth);
  } else {
    animationId = null;
  }
}
// Функция создания зубов
function createTeeth(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  // Создаем несколько зубов
  const count = 18 + Math.floor(Math.random() * 10); // От 18 до 28 зубов
  for (let i = 0; i < count; i++) {
    const offsetX = (Math.random() - 0.5) * rect.width;
    const offsetY = (Math.random() - 0.5) * rect.height;
    teeth.push(new FallingTooth(x + offsetX, y + offsetY));
  }
  // Запускаем анимацию если она еще не запущена
  if (animationId === null) {
    animateTeeth();
  }
}
// ==================== ОСНОВНОЙ КОД ====================
// Загрузка страницы
window.addEventListener('load', () => {
  // Скрываем прелоадер
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
  // Инициализация функционала
  initTypingTitles();
  initCounters();
  initGallery();
  initScrollEffects();
  // Добавляем обработчики кликов на все feature-card
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    if (card.id !== 'open-gallery-card') {
      card.addEventListener('click', createTeeth);
    }
  });
});
// Анимация печатающегося текста для заголовков
function initTypingTitles() {
  const typingTitles = document.querySelectorAll('.typing-title');
  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const title = entry.target;
        const text = title.textContent;
        title.textContent = '';
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        title.appendChild(cursor);
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            title.insertBefore(document.createTextNode(text[i]), cursor);
            i++;
            setTimeout(typeWriter, 150);
          } else {
            setTimeout(() => {
              cursor.style.animation = 'none';
              setTimeout(() => cursor.remove(), 500);
            }, 2000);
          }
        };
        setTimeout(typeWriter, 300);
        typingObserver.unobserve(title);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });
  typingTitles.forEach(title => {
    typingObserver.observe(title);
  });
}
// Анимация счетчиков
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            setTimeout(updateCounter, 16);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}
// ГАЛЕРЕЯ - данные изображений
const galleryImages = [
  { src: "photos/1.jpg", alt: "Dental work example 1" },
  { src: "photos/2.jpg", alt: "Dental work example 2" },
  { src: "photos/3.png", alt: "Dental work example 3" },
  { src: "photos/4.jpg", alt: "Dental work example 4" },
  { src: "photos/5.png", alt: "Dental work example 5" },
  { src: "photos/6.png", alt: "Dental work example 6" },
  { src: "photos/7.png", alt: "Dental work example 7" }
];
// Элементы галереи
const galleryModal = document.getElementById('galleryModal');
const openGalleryCard = document.getElementById('open-gallery-card');
const closeGalleryBtn = document.querySelector('.close-gallery');
const mainImage = document.getElementById('mainImage');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
let currentImageIndex = 0;
let startX = 0;
let endX = 0;
let isAnimating = false;
// Инициализация галереи
function initGallery() {
  // Создаем миниатюры
  galleryImages.forEach((image, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = image.src;
    thumbnail.alt = image.alt;
    thumbnail.className = 'thumbnail';
    if (index === 0) thumbnail.classList.add('active');
    thumbnail.addEventListener('click', () => {
      if (!isAnimating) {
        showImage(index);
      }
    });
    thumbnailsContainer.appendChild(thumbnail);
  });
  // Устанавливаем первое изображение сразу при загрузке
  if (galleryImages.length > 0) {
    setMainImage(0);
  }
  // Добавляем обработчики свайпа
  initSwipeGestures();
}
// Установка главного изображения (без анимации)
function setMainImage(index) {
  currentImageIndex = index;
  const image = galleryImages[index];
  mainImage.src = image.src;
  mainImage.alt = image.alt;
  // Обновляем активную миниатюру
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  // Обновляем заголовок
  document.querySelector('.gallery-title-modal').textContent =
    `My Work Gallery (${index + 1}/${galleryImages.length})`;
}
// Инициализация жестов свайпа
function initSwipeGestures() {
  const galleryBody = document.querySelector('.gallery-body');
  galleryBody.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  galleryBody.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  }, { passive: true });
  galleryBody.addEventListener('touchend', () => {
    if (isAnimating) return;
    const diffX = startX - endX;
    const minSwipeDistance = 50; // минимальное расстояние для свайпа
    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Свайп влево - следующее изображение
        nextImage();
      } else {
        // Свайп вправо - предыдущее изображение
        prevImage();
      }
    }
  });
  // Обработчики для десктопных устройств (клики по краям)
  galleryBody.addEventListener('click', (e) => {
    if (isAnimating) return;
    const rect = galleryBody.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    // Если клик в левой трети экрана - предыдущее изображение
    if (clickX < width / 3) {
      prevImage();
    }
    // Если клик в правой трети экрана - следующее изображение
    else if (clickX > width * 2 / 3) {
      nextImage();
    }
  });
}
// Показать изображение по индексу с плавной анимацией
function showImage(index) {
  if (isAnimating || index === currentImageIndex) return;
  isAnimating = true;
  currentImageIndex = index;
  const image = galleryImages[index];
  // Добавляем класс анимации
  mainImage.classList.add('slide-in');
  // Устанавливаем новое изображение
  mainImage.src = image.src;
  mainImage.alt = image.alt;
  // Обновляем активную миниатюру
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  // Обновляем заголовок
  document.querySelector('.gallery-title-modal').textContent =
    `My Work Gallery (${index + 1}/${galleryImages.length})`;
  // Сбрасываем анимацию после завершения
  setTimeout(() => {
    mainImage.classList.remove('slide-in');
    isAnimating = false;
  }, 400);
}
// Следующее изображение
function nextImage() {
  let nextIndex = currentImageIndex + 1;
  if (nextIndex >= galleryImages.length) {
    nextIndex = 0;
  }
  showImage(nextIndex);
}
// Предыдущее изображение
function prevImage() {
  let prevIndex = currentImageIndex - 1;
  if (prevIndex < 0) {
    prevIndex = galleryImages.length - 1;
  }
  showImage(prevIndex);
}
// Открыть галерею
function openGallery() {
  // Убеждаемся, что первое изображение установлено
  if (!mainImage.src || mainImage.src === '') {
    setMainImage(0);
  }
  galleryModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Фокус на кнопке закрытия для доступности
  closeGalleryBtn.focus();
}
// Закрыть галерею
function closeGallery() {
  galleryModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  // Возвращаем фокус на кнопку открытия галереи
  openGalleryCard.focus();
}
// Обработчики событий для галереи
openGalleryCard.addEventListener('click', openGallery);
closeGalleryBtn.addEventListener('click', closeGallery);
// Закрытие по клику вне контента
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) {
    closeGallery();
  }
});
// Навигация с клавиатуры
document.addEventListener('keydown', (e) => {
  if (galleryModal.classList.contains('active') && !isAnimating) {
    switch(e.key) {
      case 'Escape':
        closeGallery();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }
});
// Вибрация при клике (только на поддерживающих устройствах)
document.addEventListener('click', (e) => {
  if (e.target.closest('.feature-card, .gallery-card, .social-link')) {
    if (navigator.vibrate) navigator.vibrate(10); // Уменьшено до 10мс
  }
});
// Эффекты при скролле
function initScrollEffects() {
  // Simple animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        if (entry.target.classList.contains('contacts-blur-box')) {
          entry.target.classList.add('visible');
        }
      }
    });
  }, observerOptions);
  // Add animation to sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  // Observer for cases (iframes)
  const caseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 200);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  // Observe all cases
  document.querySelectorAll('.case').forEach(caseElement => {
    caseObserver.observe(caseElement);
  });
  // Special observer for contacts blur box
  const contactsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 300);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });
  // Observe contacts blur box
  const contactsBox = document.querySelector('.contacts-blur-box');
  if (contactsBox) {
    contactsObserver.observe(contactsBox);
  }
  // Observer for video container
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 400);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  // Observe all terminal-video-container
  document.querySelectorAll('.terminal-video-container').forEach(container => {
    videoObserver.observe(container);
  });
}
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
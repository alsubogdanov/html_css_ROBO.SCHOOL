const myModal = document.getElementById("myModal");
function openModal() {
  myModal.style.display = "flex";
}

function closeModal() {
  console.log(event);

  if (
    event.target === myModal ||
    event.target === document.getElementById("closeModalBtn")
  ) {
    myModal.style.display = "none";
  }
  // document.getElementById('myModal').style.display = 'none';
}

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let cards = Array.from(carousel.children);
const visibleCount = 3; //сколько карточек видно одновременно
// const cardWidth = 130; // 120px + margin (2*5)
const cardWidth = carousel.querySelector(".coache").offsetWidth + 20; // +margin

let currentIndex = visibleCount; //текущая позиция (мы сразу сдвигаемся на visibleCount, т.к. в начале будут клоны)

function cloneCards() {
  const first = cards.slice(0, visibleCount).map((el) => el.cloneNode(true));
  console.log("first");
  console.log(first);

  const last = cards.slice(-visibleCount).map((el) => el.cloneNode(true));
  console.log("last");
  console.log(last);

  first.forEach((el) => carousel.appendChild(el));
  last
    .reverse()
    .forEach((el) => carousel.insertBefore(el, carousel.firstChild));

  cards = Array.from(carousel.children);
}

function updatePosition(animated = true) {
  if (!animated) carousel.style.transition = "none";
  else carousel.style.transition = "transform 0.3s ease";

  const offset = -currentIndex * cardWidth;
  carousel.style.transform = `translateX(${offset}px)`;

  // 🔵 Обновление прогресса
  const maxIndex = cards.length - 2 * visibleCount;
  const relativeIndex = currentIndex - visibleCount;
  const progressPercent = (relativeIndex / (maxIndex - 1)) * 100;

  document.querySelector(".progress-bar").style.width = `${progressPercent}%`;
}
function setup() {
  cloneCards();
  updatePosition(false); //Мгновенно "перепрыгнуть" к нужной позиции (в центр карусели, после клонов)
}

setup();
nextBtn.addEventListener("click", () => {
  console.log(currentIndex); // 1. Вывод текущего индекса
  currentIndex++; // 2. Сдвигаемся вправо на 1 карточку
  updatePosition(); // 3. Применяем анимацию прокрутки

  if (currentIndex === cards.length - visibleCount) {
    // 4. Если дошли до клонированных карточек в конце (край)
    setTimeout(() => {
      currentIndex = visibleCount; // 5. Мгновенно возвращаемся в начало
      updatePosition(false); //    ...без анимации
    }, 300); // 6. Ждём, пока закончится анимация (в CSS — 0.3s)
  }
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  updatePosition();

  if (currentIndex === 0) {
    setTimeout(() => {
      currentIndex = cards.length - 2 * visibleCount;
      updatePosition(false);
    }, 300);
  }
});

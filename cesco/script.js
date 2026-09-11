const news = [
  {
    image: "assets/news-1.jpg",
    title: "საარჩევნო ადმინისტრაციამ საინფორმაციო სივრცის მონიტორინგის მორიგი ანგარიში გამოაქვეყნა",
    date: "27 აგვისტო, 2026",
    text: "საქართველოს ცენტრალურმა საარჩევნო კომისიამ (ცესკო) საინფორმაციო სივრცის მონიტორინგის მორიგი ანგარიში გამოაქვეყნა. დოკუმენტი საარჩევნო პროცესთან დაკავშირებულ ძირითად საკითხებს აერთიანებს."
  },
  { image: "assets/news-2.jpg", title: "12 სექტემბერს,15:00 საათზე ცესკოში სხდომა გაიმართება", date: "11 სექტემბერი, 2026", text: "ცენტრალური საარჩევნო კომისიის მორიგი სხდომა 12 სექტემბერს გაიმართება." },
  { image: "assets/news-3.jpg", title: "ცესკოს თავმჯდომარე და მდივანი უსკოს ახალ თავმჯდომარეს და აჭარის საოლქო საარჩევნო კომისიების თავმჯდომარეებს შეხვდნენ", date: "11 სექტემბერი, 2026", text: "შეხვედრაზე მიმდინარე საარჩევნო საკითხები და სამომავლო თანამშრომლობა განიხილეს." },
  { image: "assets/news-4.jpg", title: "ცესკოს ხელმძღვანელი პირების შეხვედრა ვანის საოლქო საარჩევნო კომისიაში", date: "10 სექტემბერი, 2026", text: "საარჩევნო ადმინისტრაციის ხელმძღვანელი პირები საოლქო კომისიის წევრებს შეხვდნენ." },
  { image: "assets/news-5.jpg", title: "ცესკოს თავმჯდომარის მოადგილემ გომბორის მოხალისეთა მომზადების ცენტრში შეხვედრა გამართა", date: "8 სექტემბერი, 2026", text: "შეხვედრა ახალგაზრდების ინფორმირებასა და საარჩევნო პროცესში ჩართულობას შეეხო." },
  { image: "assets/news-6.jpg", title: "3 ოქტომბრის შუალედური არჩევნებისთვის საუბნო საარჩევნო კომისიების წევრთა ტრენინგების ციკლი დაიწყო", date: "2 სექტემბერი, 2026", text: "საარჩევნო ადმინისტრაციის სწავლების ცენტრმა ტრენინგების ახალი ციკლი დაიწყო." },
  { image: "assets/news-7.jpg", title: "გრძელდება საინფორმაციო შეხვედრები საზაფხულო ბანაკების მონაწილეებთან", date: "1 სექტემბერი, 2026", text: "ახალგაზრდებთან საინფორმაციო შეხვედრები ქვეყნის მასშტაბით გრძელდება." },
  { image: "assets/news-8.jpg", title: "2026 წლის შუალედური არჩევნებისთვის საუბნო საარჩევნო კომისიების წევრთა ტრენინგების ციკლი იწყება", date: "1 სექტემბერი, 2026", text: "ტრენინგები საუბნო საარჩევნო კომისიების წევრებისთვის ჩატარდება." },
  { image: "assets/news-9.jpg", title: "საარჩევნო ადმინისტრაციამ ყვარლის ახალგაზრდული ბანაკის მონაწილეებთან მორიგი შეხვედრა გამართა", date: "31 აგვისტო, 2026", text: "ახალგაზრდებმა არჩევნების ორგანიზებისა და ტექნოლოგიების შესახებ ინფორმაცია მიიღეს." },
  { image: "assets/news-10.jpg", title: "ცესკოს თავმჯდომარის შეხვედრა გომბორის მოხალისეთა მომზადების ცენტრში", date: "27 აგვისტო, 2026", text: "შეხვედრაზე ახალგაზრდების სამოქალაქო ჩართულობის მნიშვნელობაზე ისაუბრეს." }
];

const heroImage = document.querySelector("#hero-image");
const heroTitle = document.querySelector("#hero-title");
const heroDate = document.querySelector("#hero-date");
const heroText = document.querySelector("#hero-text");
const dots = document.querySelector(".dots");
let currentSlide = 0;
let autoplay;

function showSlide(index) {
  currentSlide = (index + news.length) % news.length;
  const item = news[currentSlide];
  heroImage.style.opacity = "0";
  window.setTimeout(() => {
    heroImage.src = item.image;
    heroImage.style.opacity = "1";
  }, 140);
  heroTitle.textContent = item.title;
  heroDate.textContent = item.date;
  heroText.textContent = item.text;
  [...dots.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
  });
}

news.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `სლაიდი ${index + 1}`);
  dot.addEventListener("click", () => {
    showSlide(index);
    restartAutoplay();
  });
  dots.append(dot);
});

function restartAutoplay() {
  window.clearInterval(autoplay);
  autoplay = window.setInterval(() => showSlide(currentSlide + 1), 6000);
}

document.querySelector(".slide-prev").addEventListener("click", () => {
  showSlide(currentSlide - 1);
  restartAutoplay();
});
document.querySelector(".slide-next").addEventListener("click", () => {
  showSlide(currentSlide + 1);
  restartAutoplay();
});

const mobileOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const mobileList = document.querySelector("#mobile-news-list");
mobileOrder.forEach(index => {
  const item = news[index];
  const article = document.createElement("article");
  article.innerHTML = `
    <a href="#" aria-label="${item.title}"><img src="${item.image}" alt=""></a>
    <div class="mobile-copy">
      <h2><a href="#">${item.title}</a></h2>
      <time>${item.date}</time>
    </div>`;
  mobileList.append(article);
});

const mobileNavigation = document.querySelector(".mobile-navigation");
const sandwich = document.querySelector(".sandwich");
const closeButton = document.querySelector(".mobile-close");

function toggleMobileMenu(force) {
  const shouldOpen = typeof force === "boolean" ? force : !mobileNavigation.classList.contains("active");
  mobileNavigation.classList.toggle("active", shouldOpen);
  sandwich.classList.toggle("active", shouldOpen);
  sandwich.setAttribute("aria-expanded", String(shouldOpen));
}

sandwich.addEventListener("click", () => toggleMobileMenu());
closeButton.addEventListener("click", () => toggleMobileMenu(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") toggleMobileMenu(false);
});

document.querySelectorAll(".mobile-parent").forEach(button => {
  button.addEventListener("click", () => {
    const parent = button.parentElement;
    const open = parent.classList.toggle("open");
    button.querySelector("span").textContent = open ? "−" : "＋";
  });
});

mobileNavigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => toggleMobileMenu(false));
});

document.querySelector(".search").addEventListener("submit", event => event.preventDefault());

showSlide(0);
restartAutoplay();

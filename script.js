const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const revealItems = document.querySelectorAll(".reveal");

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", selected !== "all" && !categories.includes(selected));
    });
  });
});

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Values from the Project 2 research exports; percentages use a fixed 0–40% axis.
const riskViews = {
  volatility: { reported: 9.360217233946372, desmoothed: 15.34082250100667, note: "Annualized volatility rises by 5.98 percentage points after desmoothing." },
  loss: { reported: 18.59, desmoothed: 31.01, note: "Simulated one-year loss probability rises by 12.42 percentage points in the 60/40 world-equity / PE-proxy blend." }
};
document.querySelectorAll("[data-risk]").forEach((button) => {
  button.addEventListener("click", () => {
    const view = riskViews[button.dataset.risk];
    document.querySelectorAll("[data-risk]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    ["reported", "desmoothed"].forEach((key) => {
      document.querySelector(`[data-risk-${key}]`).textContent = `${view[key].toFixed(2)}%`;
      document.querySelector(`[data-risk-bar-${key}]`).style.width = `${view[key] / 40 * 100}%`;
    });
    document.querySelector("[data-risk-note]").textContent = view.note;
  });
});
const dealViews = {
  traction: { eyebrow: "Evidence lens / Traction", title: "Separate live revenue from ambition.", steps: ["Live ARR", "Committed ARR", "Forecast ARR"], body: "The review distinguishes revenue already live from customer commitments and the future growth target. A large shop pipeline supports the opportunity, but conversion and higher revenue per shop still have to materialize.", question: "Evidence that the pipeline converts into paying shops and that expansion revenue supports the planned ramp." },
  valuation: { eyebrow: "Evidence lens / Valuation", title: "A forward multiple is a conditional promise.", steps: ["Entry price", "Revenue ramp", "Exit outcome"], body: "The entry multiple was above the software comparables cited in the review. The price looked more attractive against forecast revenue, making the investment case highly dependent on executing an ambitious growth plan.", question: "A lower entry price or stronger revenue evidence that reduces dependence on the forecast." },
  ownership: { eyebrow: "Evidence lens / Ownership", title: "A good product still has to fit the fund.", steps: ["Check size", "Ownership", "Board position"], body: "The investor’s minimum ownership requirement implied funding nearly the entire seed round at the indicated valuation. Securing that stake and a board seat made the round structure a central constraint, alongside the return target.", question: "A round structure and valuation that allow the required ownership and board participation within the investment mandate." }
};
document.querySelectorAll("[data-deal]").forEach((button) => {
  button.addEventListener("click", () => {
    const view = dealViews[button.dataset.deal];
    document.querySelectorAll("[data-deal]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    ["eyebrow", "title", "body", "question"].forEach((key) => { document.querySelector(`[data-deal-${key}]`).textContent = view[key]; });
    ["one", "two", "three"].forEach((key, i) => { document.querySelector(`[data-deal-step-${key}]`).textContent = view.steps[i]; });
  });
});

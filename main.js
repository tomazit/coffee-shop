document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = [...document.querySelectorAll(".menu-button")];
  const activeMenu = document.getElementById("active-menu");
  const toggle = document.querySelector(".mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  const menuData = {
    drinks: [
      { name: "Espresso", price: "$2.50", desc: "Short, bold, and full of character.", img: "assets/espresso.png" },
      { name: "Americano", price: "$2.75", desc: "Espresso softened with hot water.", img: "assets/cafe-americano.png" },
      { name: "Latte", price: "$3.50", desc: "Espresso and steamed milk, finished silky.", img: "assets/latte.jpg" },
      { name: "Cappuccino", price: "$3.75", desc: "A balanced cup with a cloud of milk foam.", img: "assets/capuccino.jpg" },
      { name: "Mocha", price: "$4.00", desc: "Espresso, chocolate, and steamed milk.", img: "assets/mocha.jpg" },
      { name: "Macchiato", price: "$3.25", desc: "A rich espresso with a touch of milk.", img: "assets/macchiato.jpg" },
      { name: "Flat White", price: "$3.50", desc: "Velvety microfoam over a double espresso.", img: "assets/flat-white.jpg" },
      { name: "Cortado", price: "$3.00", desc: "Equal parts espresso and warm milk.", img: "assets/cortado.jpg" },
      { name: "Cold Brew", price: "$4.25", desc: "Slow-steeped overnight, smooth and bright.", img: "assets/cold-brew.png" },
      { name: "Affogato", price: "$4.50", desc: "Vanilla gelato with a shot of hot espresso.", img: "assets/Affogato.jpg" }
    ],
    pastries: [
      { name: "Croissant", price: "$2.50", desc: "Buttery, flaky layers, baked until golden.", img: "assets/croissant.jpg" },
      { name: "Apple Pie", price: "$3.00", desc: "Warm apples and cinnamon in a tender crust.", img: "assets/apple-pie.jpg" },
      { name: "Glazed Donut", price: "$1.80", desc: "A soft classic with a delicate sugar glaze.", img: "assets/glazed-donut.jpg" },
      { name: "Lemon Muffin", price: "$2.20", desc: "A tender little bake with a bright citrus lift.", img: "assets/lemmon.muffin.jpg" },
      { name: "Chocolate Brownie", price: "$3.50", desc: "Deep chocolate, crisp edges, soft center.", img: "assets/chocolate-brownie.jpg" }
    ],
    sandwiches: [
      { name: "Ham & Cheese", price: "$4.00", desc: "Melted cheese and ham on fresh-baked bread.", img: "assets/ham-cheese.jpg" },
      { name: "Turkey Club", price: "$5.50", desc: "Turkey, crisp greens, tomato, and bacon.", img: "assets/turkey.jpg" },
      { name: "Caprese", price: "$4.80", desc: "Fresh mozzarella, tomato, basil, olive oil.", img: "assets/caprese.jpg" },
      { name: "Grilled Chicken", price: "$5.20", desc: "Grilled chicken with greens and creamy sauce.", img: "assets/chicken.jpg" },
      { name: "Garden Veggie", price: "$4.50", desc: "Grilled vegetables and hummus on grain bread.", img: "assets/veggie.jpg" }
    ]
  };

  function renderMenu(category) {
    activeMenu.replaceChildren();
    menuData[category].forEach((item) => {
      const card = document.createElement("article");
      card.className = "active-option";
      const image = document.createElement("img");
      image.className = "option-image";
      image.src = item.img;
      image.alt = item.name;
      image.loading = "lazy";
      const title = document.createElement("h3");
      title.className = "option-name";
      title.textContent = item.name;
      const price = document.createElement("p");
      price.className = "price";
      price.textContent = item.price;
      const description = document.createElement("p");
      description.className = "description";
      description.textContent = item.desc;
      card.append(image, title, price, description);
      activeMenu.append(card);
    });
  }

  function selectCategory(button) {
    menuButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    renderMenu(button.id);
  }

  menuButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectCategory(button));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? menuButtons.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : menuButtons.length - 1)) % menuButtons.length;
      menuButtons[nextIndex].focus();
      selectCategory(menuButtons[nextIndex]);
    });
  });
  selectCategory(menuButtons[0]);

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    mobileMenu.hidden = expanded;
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      mobileMenu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      toggle.focus();
    }
  });
});

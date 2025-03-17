export class Category {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = `<div class="categories"></div>
        `;
    this.render();
  }

  render() {
    this.hostElement.innerHTML = this.template;
    const itemsContainer = this.hostElement.querySelector(".categories");

    const categoryId = location.hash.split("/")[1];
    const items = this.data.filter((item) => item.category === categoryId);

    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "item";
      itemElement.innerHTML = `
                <h3 class="title">${item.name}</h3>
                <div class="img-box">
                    <img src="${item.image}" alt="${item.name}" class="image"/>
                </div>
                <button class="link" data-item="${item.name}">Узнать цену</button>
            `;
      itemsContainer.appendChild(itemElement);
    });

    this.applyHandlers();
  }

  applyHandlers() {
    const buttons = this.hostElement.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemName = button.getAttribute("data-item");
        this.requestPrice(itemName);
      });
    });
  }

  requestPrice(itemName) {
    const tg = window.Telegram.WebApp;
    tg.sendData(JSON.stringify({ action: "request_price", item: itemName }));
    tg.close();
  }
}

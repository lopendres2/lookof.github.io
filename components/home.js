export class Home {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = `<div class="categories"></div>`;
    this.render();
  }

  render() {
    this.hostElement.innerHTML = this.template;
    const categoriesContainer = this.hostElement.querySelector(".categories");

    const categories = [
      {
        name: "Кроссовки",
        id: "sneakers",
        image:
          "https://outmaxshop.ru/components/com_jshopping/files/img_products/14647/fashion-14647-1.jpg",
      },
      {
        name: "Футболки",
        id: "t-shirts",
        image:
          "https://goods-photos.static1-sima-land.com/items/8054308/2/1600.jpg?v=1722954783",
      },
      {
        name: "Худи",
        id: "hoodies",
        image:
          "https://www.tradeinn.com/f/13757/137575318/fila-victor-hoodie.jpg",
      },
      {
        name: "Джинсы",
        id: "jeans",
        image:
          "https://www.freejeans.ru/upload/iblock/eac/eac7e2eee1d2a3f3a34f97cac3c872d7.jpg",
      },
    ];

    categories.forEach((category) => {
      const categoryElement = document.createElement("div");
      categoryElement.className = "category";
      categoryElement.innerHTML = `
                <h2 class="title">${category.name}</h2>
                <div class="img-box">
                    <img src="${category.image}" alt="${category.name}" class="image" />
                </div>
                
                <a href="#category/${category.id}" class="link">Перейти</a>
            `;
      categoriesContainer.appendChild(categoryElement);
    });
  }
}

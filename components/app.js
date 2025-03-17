import { Router } from '../utils/router.js';
import { Home } from './home.js';
import { Category } from './category.js';

export class App {
    router = new Router([]);

    constructor(hostElement) {
        this.hostElement = hostElement;
        this.init();
    }

    async init() {
        const data = await this.fetchData();
        this.render(data);
    }

    async fetchData() {
        const response = await fetch('./data/data.json');
        return await response.json();
    }

    render(data) {
        this.router.add("Home", () => {
            this.hostElement.innerHTML = '';
            new Home(data, this.hostElement).render();
        });

        this.router.add("Category", () => {
            this.hostElement.innerHTML = '';
            new Category(data, this.hostElement).render();
        });

        this.router.onHashChange();
    }
}
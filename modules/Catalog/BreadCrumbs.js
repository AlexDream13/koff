import {addContainer} from "../addContainer.js";
import {router} from "../../main.js";

export class BreadCrumbs {
    static instance = null;
    constructor() {
        if(!BreadCrumbs.instance){
            BreadCrumbs.instance = this;
            this.element = document.createElement('div');
            this.element.classList.add('breadcrumb');
            this.containerElement = addContainer(this.element);
        }
        return BreadCrumbs.instance;
    }
    mount(parent, data){
        this.render(data);
        parent.append(this.element);
        router.updatePageLinks();
    }
    unmount(){
        this.element.remove();
    }
    render(list){
        this.containerElement.textContent = '';
        const listElem = document.createElement('ul');
        listElem.classList.add('breadcrumb__list');

        const breadCrumbList = [{text: "Главная", href: "/"}, ...list];
        const listItems = breadCrumbList.map((item) => {
           const listItemElem = document.createElement('li');
           listItemElem.classList.add('breadcrumb__item');

           const link = document.createElement('a');
           link.classList.add('breadcrumb__link');
           link.textContent = item.text;
           if(item.href){
               link.href = item.href;
           }

           const separator = document.createElement('span');
           separator.classList.add('breadcrumb__separator');
           separator.innerHTML = '&gt;';

           listItemElem.append(link, separator);
           return listItemElem;
        });
        listElem.append(...listItems);
        this.containerElement.append(listElem);
    }

}

/*
<div class="breadcrumb" >
    <div class="container">
        <ul class="breadcrumb__list">
            <li class="breadcrumb__item">
              <a class="breadcrumb__link" href="/">Главная</a>
              <span class="breadcrumb__separator">&gt;</span>
            </li>
            <li class="breadcrumb__item">
              <a class="breadcrumb__link" href="/category?slug=Кресла">Кресла</a>
              <span class="breadcrumb__separator">&gt;</span>
            </li>
            <li class="breadcrumb__item">
              <a class="breadcrumb__link">Кресло с подлокотниками</a>
              <span class="breadcrumb__separator">&gt;</span>
            </li>
        </ul>
    </div>
</div>
*/
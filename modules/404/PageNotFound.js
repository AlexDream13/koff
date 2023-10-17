import {addContainer} from "../addContainer";

export class PageNotFound{
    static instance = null;
    constructor(){
        if(!PageNotFound.instance){
            PageNotFound.instance = this;
            this.element = document.createElement('div');
            this.element.classList.add('notfound');
            this.containerElement = addContainer(this.element);
            this.isMounted = false;
        }
        return PageNotFound.instance;
    }
    mount(parent){
        if(this.isMounted){
            return;
        }
        this.renderElement();
        parent.append(this.element);
        this.isMounted = true;
    }
    unmount(){
        this.element.remove();
        this.isMounted = false;
    }
    renderElement(){
        const title = document.createElement('h1');
        title.classList.add('notfound__title');
        title.textContent = 'Страница 404';

        const text = document.createElement('p');
        text.textContent = 'Вы попали на эту страницу потому, что страницы, на которую вы пытаетесь перейти - не существует';

        this.containerElement.append(title,text);
    }
}
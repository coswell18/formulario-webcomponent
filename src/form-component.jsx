import React from 'react';
import ReactDOM from 'react-dom/client';
import DynamicForm from './components/DynamicForm';
// import formStyles from './components/form.css?inline';

class FormComponent extends HTMLElement {
  constructor() {
    super();
    this.mountPoint = document.createElement('div');
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Agregar estilos al shadow DOM
    // const style = document.createElement('style');
    // style.textContent = formStyles;
    // this.shadow.appendChild(style);
    
      // Inyectar estilos dentro del Shadow DOM
    const bootstrap = document.createElement('link');
    bootstrap.setAttribute('rel', 'stylesheet');
    bootstrap.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    this.shadow.appendChild(bootstrap);

    const govco = document.createElement('link');
    govco.setAttribute('rel', 'stylesheet');
    govco.setAttribute('href', 'https://cdn.www.gov.co/layout/v4/all.css');
    this.shadow.appendChild(govco);

    // Si tienes un CSS personalizado
    // const customCss = document.createElement('link');
    // customCss.setAttribute('rel', 'stylesheet');
    // customCss.setAttribute('href', './dynamic-form.css');
    // this.shadow.appendChild(customCss);

    this.shadow.appendChild(this.mountPoint);

    // Leer atributos del tag <dynamic-form> para obtener JSON
    setTimeout(() => {
      const schemaAttr = this.getAttribute('schema');
      const dataAttr = this.getAttribute('data');
      const titleAttr = this.getAttribute('title');

      let schema = [];
      let data = {};
      let title = '';

      try {
        if (schemaAttr) schema = JSON.parse(schemaAttr || '[]');
        if (dataAttr) data = JSON.parse(dataAttr || '{}');
        if (titleAttr) title = titleAttr;
      } catch (error) {
        console.error('Error parsing attributes:', error);
      }

      ReactDOM.createRoot(this.mountPoint).render(
        <DynamicForm schema={schema} data={data} title={title} />
      );
    }, 500);
    
  }
}

customElements.define('dynamic-form', FormComponent);


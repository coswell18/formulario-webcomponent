# 🧩 Formulario Dinámico como Web Component con React

Este proyecto convierte un formulario dinámico creado con React en un **Web Component** reutilizable. Permite ser utilizado en cualquier entorno, incluyendo archivos HTML puros y aplicaciones Angular, sin necesidad de reescribir componentes.

---

## 🚀 Características

- Formularios dinámicos a partir de esquemas JSON (`schema`)
- Validaciones con `Formik` y `Yup`
- Estilos compatibles con Bootstrap y GOV.CO
- Compatible con HTML y Angular
- Estado global de formulario con Zustand

---

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/formulario-dinamico-webcomponent.git
cd formulario-dinamico-webcomponent
npm install

```
---

## 🧪 Modo Desarrollo

npm run dev

## 🌐 Uso en HTML

EN el archivo externalPage.html en la carpeta public pegar el siguiente código 

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formulario Externo</title>
    <!-- ✅ React y ReactDOM deben ir ANTES -->
    <link href="https://cdn.www.gov.co/layout/v4/all.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <!-- ✅ Componente compilado -->
    <script src="https://cdn.www.gov.co/layout/v4/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="./dynamic-form.iife.js"></script>
    

  </head>
  <body>
    <div class="container">

          <h1 class="h1-tipografia-govco text-center mt-5">Usando formulario React desde HTML</h1>
          <dynamic-form
        schema='[
          {
            "name": "nombre",
            "label": "Nombre",
            "type": "text",
            "validations": {
              "required": true,
              "minLength": 3
            }
          },
          {
            "name": "apellido",
            "label": "Apellidos",
            "type": "text",
            "validations": {
              "required": true,
              "minLength": 10
            }
          },
          {
            "name": "edad",
            "label": "Edad",
            "type": "number",
            "validations": {
              "required": true,
              "min": 18,
              "max": 99
            }
          },
          {
            "name": "acerca",
            "label": "A cerca de",
            "type": "textarea",
            "validations": {
              "required": true,
              "max": 100
            }
          }
        ]'
        data='{
          "nombre": "Juan",
          "apellido": "Cardona",
          "edad": 10,
          "acerca":""
        }'
      
        title=''
      ></dynamic-form>
      <h2 class="h2-tipografia-govco text-center my-3">Datos enviados desde el webComponent y capturados desde el HTML Padre</h2>
      <span id="datos"></span>
    </div>

  </body>
  <script>
    window.addEventListener('form-submit', (event) => {
      console.log('Datos del formulario:', event.detail);
      document.getElementById("datos").innerHTML = JSON.stringify(event.detail);
    });
  </script>
</html>


## 📦 Construcción web component

npm run build

Una vez cosntruido el proyecto, ejecutar el archovo externalPage.html con live server.


---

## ⚙️ Uso en Angular

1- Una vez servidos los archivos expuestos con liver server en el paso anterior, en el index.html del
proyecto de angular integrar las dependencias de la siguiente manera

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>PostsApp</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link href="https://cdn.www.gov.co/layout/v4/all.css" rel="stylesheet" />
  </head>
  <body>
    <app-root></app-root>
  </body>
  <script src="https://cdn.www.gov.co/layout/v4/script.js"></script>
  <script src="http://127.0.0.1:5500/dist/dynamic-form.iife.js"></script>
</html>

2- En tu app.component.ts, define los modelos:

export class AppComponent {
  schema = JSON.stringify([
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      validations: { required: true }
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      validations: { minLength: 10 }
    }
  ]);

  initialData = JSON.stringify({
    nombre: 'Juan',
    descripcion: 'Texto inicial'
  });
}

3- En tu app.component.html, úsalo así:

<dynamic-form
  [attr.schema]="schema"
  [attr.data]="initialData"
  title="Formulario Angular"
></dynamic-form>


---

## 📁 Estructura del Proyecto

FORMULARIO-WEBCOMPONENT/
├── dist/                           # Archivos generados tras build
│   ├── dynamic-form.css
│   ├── dynamic-form.iife.js       # Web Component para uso externo
│   └── externalPage.html          # Ejemplo HTML puro
│
├── node_modules/                  # Dependencias npm
│
├── public/
│   ├── externalPage.html          # Otra copia del ejemplo externo
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg              # Imagen o íconos
│   │
│   ├── components/
│   │   ├── DynamicForm.jsx        # Componente principal del formulario
│   │   ├── ShowGlobalButton.jsx   # Botón para mostrar estado global
│   │   
│   │
│   ├── dataConfig/
│   │   └── form-definition.json   # JSON opcional para cargar definiciones
│   │
│   ├── shared/
│   │   ├── Footer.jsx             # Pie de página reutilizable
│   │   └── Navbar.jsx             # Barra de navegación
│   │
│   ├── store/
│   │   └── useFormStore.js        # Manejo de estado global con Zustand
│   │
│   ├── App.jsx                    # Componente App principal (opcional)
│   ├── App.css                    # Estilos de App
│   ├── form-component.jsx        # Definición del Web Component
│   ├── index.css                  # Estilos generales
│   ├── main.jsx                   # Entrada React para renderizado
│
├── .gitignore
├── index.html                    # Entrada HTML principal para Vite
├── package

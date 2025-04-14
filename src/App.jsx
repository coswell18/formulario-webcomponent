import React, {  useEffect, useState } from 'react';
import DynamicForm from './components/DynamicForm.jsx';
import formDefinition from './dataConfing/form-definition.json';
import ShowGlobalStateButton from './components/ShowGlobalButton.jsx';
import Footer from './shared/Footer.jsx';
import Navbar from './shared/Navbar.jsx';
function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const handleFormSubmit = (event) => {
      console.log('Datos del formulario:', event.detail);
      setData(event.detail);
    };

    window.addEventListener('form-submit', handleFormSubmit);

    // Limpiar el evento al desmontar
    return () => {
      window.removeEventListener('form-submit', handleFormSubmit);
    };
  }, []);

  const initialData = {
    nombre:'Juan',
    apellido: 'Cardona',
    edad: 10,
    sobre:""
  };
  return (
    <div>
      <Navbar/>
      <div className="container py-5">
        <DynamicForm schema={formDefinition} data={initialData} title={'Formulario de ejemplo'}/>
        <div className='d-flex flex-column mt-5 justify-content-center'>
          <h3 className="h3-tipografia-govco mb-3">Datos del formulario</h3>
          <pre>{JSON.stringify(data)}</pre>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
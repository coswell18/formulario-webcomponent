import React from 'react';
import DynamicForm from './components/DynamicForm.jsx';
import formDefinition from './dataConfing/form-definition.json';
import ShowGlobalStateButton from './components/ShowGlobalButton.jsx';
import Footer from './shared/Footer.jsx';
import Navbar from './shared/Navbar.jsx';
function App() {
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
      </div>
      <Footer/>
    </div>
  );
}

export default App;
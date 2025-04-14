import React from 'react';
import { useFormStore } from '../store/useFormStore';

export default function ShowGlobalStateButton() {
  const formData = useFormStore((state) => state.formData);

  const showGlobalState = () => {
    console.log(formData); // Aquí ya tienes acceso al estado global
    const event = new CustomEvent('form-submit', { detail: formData });
    window.dispatchEvent(event);
  };

  return <button type="button" className='btn-govco outline-btn-govco mx-4' onClick={showGlobalState}>Mostrar Estado Global</button>;
}
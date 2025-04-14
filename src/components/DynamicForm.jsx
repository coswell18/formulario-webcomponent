// src/components/DynamicForm.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFormStore } from '../store/useFormStore';
import ShowGlobalStateButton from './ShowGlobalButton';

const buildValidationSchema = (fields) => {
    const shape = {};
  
    fields.forEach((field) => {
      let validator = Yup.string();
  
      if (field.type === 'number') validator = Yup.number();
  
      if (field.validations?.required) {
        validator = validator.required('Campo obligatorio');
      }
  
      if (field.validations?.minLength) {
        validator = validator.min(
          field.validations.minLength,
          `Debe tener al menos ${field.validations.minLength} caracteres`
        );
      }
  
      if (field.validations?.min) {
        validator = validator.min(
          field.validations.min,
          `Debe ser mayor o igual a ${field.validations.min}`
        );
      }
  
      if (field.validations?.max) {
        validator = validator.max(
          field.validations.max,
          `Debe ser menor o igual a ${field.validations.max}`
        );
      }
  
      if (field.validations?.email) {
        validator = validator.email('Correo electrónico inválido');
      }
  
      shape[field.name] = validator;
    });
  
    return Yup.object().shape(shape);
  };
  

export default function DynamicForm({ schema = [], data = {}, title }) {
  const setFormData = useFormStore((state) => state.setFormData);

  const formik = useFormik({
    initialValues: schema.reduce(
      (acc, field) => ({ ...acc, [field.name]: data[field.name] || '' }),
      {}
    ),
    validationSchema: buildValidationSchema(schema),
    onSubmit: (values) => {
      setFormData(values);
    },
  });

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formik.values[field.name],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      className: 'form-control',
    };
  
    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={field.rows || 3} />;
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Seleccione una opción</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={formik.values[field.name]}
            onChange={(e) =>
              formik.setFieldValue(field.name, e.target.checked)
            }
          />
        );
      default:
        return <input type={field.type} {...commonProps} />;
    }
  };



  return (
    <div className=''>
        <h2 className="h2-tipografia-govco text-center">{title}</h2>
        <form onSubmit={formik.handleSubmit} className="form">
        {schema.map((field, idx) => (
            <div key={idx} className="entradas-de-texto-govco">
                <label htmlFor={field.name}>{field.label}</label>
                {renderField(field)}
                {formik.touched[field.name] && formik.errors[field.name] && (
                    <div className="text-danger">{formik.errors[field.name]}</div>
                )}
            </div>
        ))}
        <div className='d-flex'>
            <button type="submit" className='btn-govco fill-btn-govco'>Enviar</button>
            <ShowGlobalStateButton/>

        </div>
        </form>
    </div>
  );
}

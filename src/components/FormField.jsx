import { Field, ErrorMessage, useFormikContext } from "formik";

const baseClass = "border rounded px-3 py-2 w-full text-sm focus:outline-none transition-colors";
const normalBorder = "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
const errorBorder = "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500";

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export default function FormField({
  name,
  placeholder,
  type = "text",
  as,
  options,
  readOnly = false,
  className = "",
  children,
  ...rest
}) {
  const { errors, touched, values } = useFormikContext();
  const hasError = getNestedValue(touched, name) && getNestedValue(errors, name);
  const borderClass = hasError ? errorBorder : normalBorder;
  const currentValue = getNestedValue(values, name);
  const selectPlaceholderClass = as === "select" && !currentValue ? "text-gray-400" : "";
  const combinedClass = `${baseClass} ${borderClass} ${selectPlaceholderClass} ${readOnly ? "bg-gray-50 cursor-default" : ""} ${className}`.trim();

  return (
    <div>
      {as === "select" ? (
        <Field as="select" name={name} className={combinedClass} required {...rest}>
          {options ? (
            <>
              <option value="" disabled>{placeholder}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </>
          ) : (
            children
          )}
        </Field>
      ) : as === "textarea" ? (
        <Field
          as="textarea"
          name={name}
          placeholder={placeholder}
          className={combinedClass}
          readOnly={readOnly}
          rows={3}
          {...rest}
        />
      ) : (
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={combinedClass}
          readOnly={readOnly}
          {...rest}
        />
      )}
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
}

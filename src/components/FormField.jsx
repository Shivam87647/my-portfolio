export default function FormField({ label, type = 'text', placeholder, value, onChange, required = false, isTextarea = false }) {
  const inputProps = {
    className: isTextarea ? 'form-textarea' : 'form-input',
    placeholder,
    value,
    onChange,
    required
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {isTextarea ? (
        <textarea {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}
    </div>
  );
}

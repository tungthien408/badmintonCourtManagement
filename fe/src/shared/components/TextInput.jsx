function TextInput({ label, id, type = "text", value, onChange, required=true, pattern }) {
    return (
        <div style={{ padding: "10px" }}>
            <label htmlFor={id}>{label}: </label>
            <input id={id} type={type} value={value} onChange={onChange} required={required} {...(pattern ? {pattern}: {})}  />
        </div>
    );
}
export default TextInput;
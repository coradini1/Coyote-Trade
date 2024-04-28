type InputProps = {
  type: "email" | "text" | "password"
  placeholder: string
  required?: boolean
  onChange?: any  
  value?: any
  props?: any
}

function Input({type, placeholder, ...props}: InputProps) {
  return (
    <input 
      {...props}
      type={type}
      className="outline-none p-3 rounded-xl border-solid border-2 focus:border-primary ease-out duration-200" 
      placeholder={placeholder}
    />
  )
}

export default Input

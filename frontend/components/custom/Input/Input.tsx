type InputProps = {
  type: "email" | "text" | "password"
  placeholder: string
  required?: boolean
  props?: any
}

function Input({type, placeholder, ...props}: InputProps) {
  return <input {...props} type={type} className="p-3 rounded-xl border-solid border-2" placeholder={placeholder} />
}

export default Input

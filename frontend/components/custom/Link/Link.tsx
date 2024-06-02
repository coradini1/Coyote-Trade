import * as Nlink from "next/link"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  text: string
  onClick?: () => void;
}

function Link({ href, text, onClick, ...props }: LinkProps) {
  return (
    <Nlink.default
      {...props}
      onClick={onClick}
      href={href}
      className="relative text-xs text-lavender-400 after:absolute after:bottom-0 after:left-0 after:h-[2px]
                after:w-0 after:bg-lavender after:transition-all after:duration-300 after:ease-out after:content-['']
                hover:after:w-full hover:after:transition-all hover:after:duration-300 hover:after:ease-out"
    >
      {text}
    </Nlink.default>
  )
}

export default Link

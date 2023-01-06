export default function Link({ href, children }) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-400"
    >
      {children}
    </a>
  )
}

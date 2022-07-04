export default function PageTitle({ children, className }) {
  return (
    <h1
      className={`${className} text-3xl font-extrabold leading-9 tracking-tight text-secondary-900 dark:text-secondary-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14`}
    >
      {children}
    </h1>
  )
}

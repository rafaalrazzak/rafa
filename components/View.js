import numberStringFormat from '@/lib/utils/numberStringFormat'
export default function View({ locale, value, className }) {
  return (
    <p className={`${className}`}>
      {numberStringFormat(locale, value)} {value <= 1 ? 'View' : 'Views'}
    </p>
  )
}

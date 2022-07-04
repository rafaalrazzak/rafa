import numberStringFormat from '@/lib/utils/numberStringFormat'
export default function View({ locale, value, className }) {
  return (
    <span className={`${className}`}>
      {numberStringFormat(locale, value)} {value <= 1 ? 'View' : 'Views'}
    </span>
    
  )
}

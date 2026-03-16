
import { useEffect, useState } from 'react'
import { SUPPORTED_CURRENCIES } from '@/lib/currency'

export default function CurrencySelector() {
  const [currency, setCurrency] = useState('USD')
  useEffect(() => {
    const c = localStorage.getItem('currency') || 'USD'
    setCurrency(c)
  }, [])

  const onChange = (e) => {
    const val = e.target.value
    setCurrency(val)
    localStorage.setItem('currency', val)
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <select value={currency} onChange={onChange} className="border rounded px-2 py-1 text-sm">
      {SUPPORTED_CURRENCIES.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}

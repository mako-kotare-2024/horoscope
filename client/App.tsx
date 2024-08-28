import React, { useState, useEffect } from 'react'
import HoroscopeInfo from './components/HoroscopeInfo'
import { getHoroscope } from './components/HoroscopeApi'
import './index.css'
import { HoroscopeData } from './../models/horoscope'

const getZodiacSign = (month: number, day: number): string => {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return 'aquarius'
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces'
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return 'scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return 'sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return 'capricorn'

  return ''
}

const App: React.FC = () => {
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [sign, setSign] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [day, setDay] = useState<string>('')

  useEffect(() => {
    const loadHoroscopeData = async () => {
      if (!sign) return

      setLoading(true)
      setError(null)
      try {
        const data = await getHoroscope(sign)
        setHoroscopeData(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
      } finally {
        setLoading(false)
      }
    }

    loadHoroscopeData()
  }, [sign])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const monthNumber = parseInt(month)
    const dayNumber = parseInt(day)

    // Add validation for month and day
    if (
      isNaN(monthNumber) ||
      isNaN(dayNumber) ||
      monthNumber < 1 ||
      monthNumber > 12 ||
      dayNumber < 1 ||
      dayNumber > 31
    ) {
      setError('Please enter a valid month and day.')
      return
    }

    const zodiacSign = getZodiacSign(monthNumber, dayNumber)
    setSign(zodiacSign)
  }

  return (
    <div className="App">
      <h1>Horoscope App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Month of Birth:
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </label>
        <label>
          Day of Birth:
          <input
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </label>
        <button type="submit">Get Horoscope</button>
      </form>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <HoroscopeInfo horoscopeData={horoscopeData} />
    </div>
  )
}

export default App

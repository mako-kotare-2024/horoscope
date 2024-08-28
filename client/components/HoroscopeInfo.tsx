import React from 'react'
import { HoroscopeData } from '../../models/horoscope'

interface HoroscopeInfoProps {
  horoscopeData: HoroscopeData | null
}

const HoroscopeInfo: React.FC<HoroscopeInfoProps> = ({ horoscopeData }) => {
  if (!horoscopeData) return <p>No data available</p>

  return (
    <div>
      <h2>Today's Horoscope</h2>
      <p>Date: {horoscopeData.data.date}</p>
      <p>Horoscope: {horoscopeData.data.horoscope_data}</p>
      <p>Status: {horoscopeData.status}</p>
      <p>Success: {horoscopeData.success ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default HoroscopeInfo

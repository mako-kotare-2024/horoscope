import request from 'superagent'
import { HoroscopeData } from '../../models/horoscope'

export async function getHoroscope(sign: string): Promise<HoroscopeData> {
  try {
    const response = await request.get('/api/v1/horoscope').query({ sign })

    if (response.status !== 200) {
      throw new Error(`API responded with status code ${response.status}`)
    }

    return response.body
  } catch (err) {
    console.error('Failed to fetch horoscope data:', err)
    throw new Error(
      err instanceof Error ? err.message : 'An unknown error occurred',
    )
  }
}

import { Router } from 'express'
import request from 'superagent'

const router = Router()

// GET 'api/v1/postcard'
router.get('/', async (req, res) => {
  const sign = req.query.sign
  try {
    const response = await request
      .get('https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily')
      .query({ sign })
    res.json(response.body)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router

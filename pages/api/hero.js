import { ObjectId } from 'mongodb'
import { connectToDb } from './db'

export default async (req, res) => {
    try {
        const db = await connectToDb()

        switch (req.method) {
            case 'GET':
                return handleGetRequest(req, res, db)
            case 'POST':
                return handlePostRequest(req, res, db)
            case 'PATCH':
                return handlePatchRequest(req, res, db)
            case 'DELETE':
                return handleDeleteRequest(req, res, db)
            default:
                return res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch (error) {
        console.error('Internal Server Error:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function handleGetRequest(req, res, db) {
    const hero = req.query.name // Access the ID from query parameters

    try {
        const data = await db.collection('heroes').findOne({ name: hero })

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ error: 'Hero not found' })
        }
    } catch (err) {
        console.error('Error fetching hero records:', err)
        return res.status(500).json({ error: 'Failed to fetch hero records' })
    }
}

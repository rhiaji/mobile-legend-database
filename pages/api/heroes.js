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
    try {
        const heroRecords = await db.collection('heroes').find().toArray()
        return res.status(200).json(heroRecords)
    } catch (err) {
        console.error('Error fetching hero records:', err)
        return res.status(500).json({ error: 'Failed to fetch hero records' })
    }
}

async function handlePostRequest(req, res, db) {
    const data = req.body

    try {
        const existingRecord = await db.collection('heroes').findOne({ name: data.name })

        if (existingRecord) {
            return res.status(409).json({ message: 'Data already exists in the database' })
        }

        const result = await db.collection('heroes').insertOne(data)

        if (result.acknowledged) {
            return res.status(201).json({ message: 'Data added successfully', data: result })
        } else {
            return res.status(400).json({ error: 'Failed to add data' })
        }
    } catch (err) {
        console.error('Error during POST request:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function handleDeleteRequest(req, res, db) {
    const data = req.body.data

    if (!data._id) {
        return res.status(400).json({ error: 'Missing hero ID' })
    }

    try {
        const result = await db.collection('heroes').deleteOne({ _id: new ObjectId(data._id) })

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: 'Hero deleted successfully' })
        } else {
            return res.status(404).json({ error: 'Hero not found' })
        }
    } catch (err) {
        console.error('Error deleting hero:', err)
        return res.status(500).json({ error: 'Failed to delete hero' })
    }
}

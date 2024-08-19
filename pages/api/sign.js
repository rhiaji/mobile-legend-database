import { ObjectId } from 'mongodb'
import { connectToDb } from './db'
import CryptoJS from 'crypto-js'

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
    const { email } = req.query // Assuming email and password are sent as query parameters

    try {
        const userRecord = await db.collection('accounts').findOne({ email: email })

        if (!userRecord) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        // If authentication is successful
        return res.status(200).json({
            success: true,
            message: 'Sign-in successful',
            user: {
                email: userRecord.email,
                name: userRecord.name,
                password: userRecord.password,
                // Other user data you might want to return
            },
        })
    } catch (err) {
        console.error('Error during GET request:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function handlePostRequest(req, res, db) {
    const data = req.body

    try {
        const existingRecord = await db.collection('accounts').findOne({ email: data.email })

        if (existingRecord) {
            return res.status(409).json({
                success: false,
                message: 'Data already exists in the database',
            })
        }

        const secretKey = process.env.NEXT_PUBLIC_REACT_PASS_ENCRYPT
        const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString()

        const accountData = {
            ...data,
            password: encryptedPassword,
        }

        const result = await db.collection('accounts').insertOne(accountData)

        if (result.acknowledged) {
            return res.status(201).json({ message: 'Data added successfully', data: result.password })
        } else {
            return res.status(400).json({ error: 'Failed to add data' })
        }
    } catch (err) {
        console.error('Error during POST request:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function handlePatchRequest(req, res, db) {
    // Implement your PATCH request logic here
}

async function handleDeleteRequest(req, res, db) {
    // Implement your DELETE request logic here
}

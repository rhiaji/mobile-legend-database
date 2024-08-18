const { MongoClient } = require('mongodb')

let dbConnection = null // Global variable to store the database connection

module.exports = {
    connectToDb: async () => {
        if (dbConnection) return dbConnection

        try {
            const client = new MongoClient(process.env.LOCAL_URI, { maxPoolSize: 500 })
            await client.connect()
            dbConnection = client.db()
            console.log('data secured')
            return dbConnection
        } catch (error) {
            console.error('Database connection error:', error)
            throw error
        }
    },

    getDbConnection: () => {
        if (!dbConnection) {
            throw new Error('No database connection established.')
        }
        return dbConnection
    },

    closeDbConnection: async () => {
        try {
            if (dbConnection) {
                await dbConnection.close()
                dbConnection = null
            }
        } catch (error) {
            console.error('Error closing the database connection:', error)
            throw error
        }
    },
}

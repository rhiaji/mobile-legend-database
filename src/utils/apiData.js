import jwt from 'jsonwebtoken'
const apiUrl = 'http://localhost:3000/api' // http://localhost:3000/api

// Update the handleFetch function in your apiData.js file
async function handleFetch(url, method, data) {
    try {
        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Only include the body if it's not null and the method is not GET or HEAD
        if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
            requestOptions.body = JSON.stringify(data)
        }

        const response = await fetch(`${apiUrl}/${url}`, requestOptions)

        if (!response.ok) {
            console.error('Error:', response.status, response.statusText)
            throw new Error('Network response was not ok')
        }

        return response.json()
    } catch (error) {
        console.error('Fetch error:', error)
        throw error
    }
}

//----------------------------------------------------------------//
// Registering an account
export async function getHero() {
    return handleFetch(`heroes`, 'GET')
}
export async function registerHero(registerData) {
    return handleFetch('heroes', 'POST', registerData)
}
export async function deleteHero(heroData) {
    return handleFetch('heroes', 'DELETE', heroData)
}
export async function updateHero(updateData) {
    return handleFetch('heroes', 'PATCH', updateData)
}

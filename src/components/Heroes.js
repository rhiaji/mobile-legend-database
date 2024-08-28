import React, { useEffect, useState } from 'react'
import { getHero } from '@/utils/apiData'

function Heroes() {
    const [heroes, setHeroes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getHero()
                setHeroes(result)
            } catch (err) {
                setError('Failed to fetch heroes')
            }
        }

        fetchData()
    }, [])
    return (
        <div className="flex flex-wrap gap-4">
            {heroes.map((data, i) => (
                <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden" key={i}>
                    <div className="px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">Name: {data.name}</h2>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-700">Class</h3>
                            <p className="text-gray-600">Class 1: {data.class.class_1}</p>
                            <p className="text-gray-600">Class 2: {data.class.class_2}</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-700">Lane</h3>
                            <p className="text-gray-600">{data.lane}</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-700">Released Date</h3>
                            <p className="text-gray-600">{data.released_date}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Heroes

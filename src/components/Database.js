import React, { useState } from 'react'

function Database() {
    const [name, setName] = useState('')
    const [selectedClass1, setSelectedClass1] = useState('')
    const [selectedClass2, setSelectedClass2] = useState('')
    const [selectedLane, setSelectedLane] = useState('')
    const [releasedDate, setReleasedDate] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        alert(
            `name: ${name} class: ${selectedClass1}${
                selectedClass2 === 'none' ? '' : ` | ${selectedClass2}`
            } lane: ${selectedLane} released Date: ${releasedDate}`
        )
    }
    return (
        <div className="px-4 md:px-32">
            <div className="flex justify-end">
                <button
                    type="button"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add Hero
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Lane
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Release Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="odd:bg-white  even:bg-gray-50  border-b ">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Miya
                            </th>
                            <td class="px-6 py-4">Marksman</td>
                            <td class="px-6 py-4">Gold</td>
                            <td class="px-6 py-4">$2999</td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600  hover:underline">
                                    Edit
                                </a>
                                <a href="#" class="ml-4 font-medium text-red-600 hover:underline">
                                    Delete
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                    <h2 className="mb-6 text-2xl font-semibold text-center">Add Hero</h2>
                    {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="name">
                                Hero Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="class">
                                Class
                            </label>
                            <select
                                id="class"
                                value={selectedClass1}
                                onChange={(e) => setSelectedClass1(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select your class
                                </option>
                                <option value="marksman">Marksman</option>
                                <option value="jungler">Jungler</option>
                                <option value="roamer">Roamer</option>
                                <option value="roamer">None</option>
                            </select>
                            <select
                                id="class"
                                value={selectedClass2}
                                onChange={(e) => setSelectedClass2(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select class
                                </option>
                                <option value="marksman">Marksman</option>
                                <option value="jungler">Jungler</option>
                                <option value="roamer">Roamer</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="lane">
                                Lane
                            </label>
                            <select
                                id="lane"
                                value={selectedLane}
                                onChange={(e) => setSelectedLane(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Lane
                                </option>
                                <option value="Gold">Gold</option>
                                <option value="Exp">Exp</option>
                                <option value="Jungle">Jungle</option>
                                <option value="Roam">Roam</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="released">
                                Released Date
                            </label>
                            <input
                                id="released"
                                type="date"
                                value={releasedDate}
                                onChange={(e) => setReleasedDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="w-full px-4 py-2 text-white bg-orange-600 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Database

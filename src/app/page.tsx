'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function RandomBuyer() {
    const [names, setNames] = useState<string[]>([]);
    const [newName, setNewName] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const addName = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newName.trim()) {
            setNames([...names, newName.trim()]);
            setNewName('');
        }
    };

    const removeName = (indexToRemove: number) => {
        setNames(names.filter((_, index) => index !== indexToRemove));
    };

    const selectBuyer = () => {
        if (names.length === 0) {
            setResult('Please add some names first!');
            return;
        }
        const randomBuyer = Math.floor(Math.random() * names.length);
        setResult(`The ideal person buying lunch for everyone today is ${names[randomBuyer]}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Random Lunch Buyer Selector</h2>
                
                {/* Input form */}
                <form onSubmit={addName} className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={newName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                            placeholder="Enter a name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors whitespace-nowrap"
                        >
                            Add Name
                        </button>
                    </div>
                </form>

                {/* Names list */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-center sm:text-left">Added Names:</h3>
                    {names.length === 0 ? (
                        <p className="text-gray-500 italic text-center sm:text-left">No names added yet</p>
                    ) : (
                        <ul className="space-y-2 max-h-48 overflow-y-auto">
                            {names.map((name, index) => (
                                <li 
                                    key={index} 
                                    className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                                >
                                    <span className="break-all mr-2">{name}</span>
                                    <button
                                        onClick={() => removeName(index)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                        type="button"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Select button */}
                <button
                    onClick={selectBuyer}
                    className="w-full px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-lg"
                    type="button"
                >
                    Select Random Buyer
                </button>

                {/* Result */}
                {result && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-md">
                        <p className="text-center font-medium text-sm sm:text-base break-words">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
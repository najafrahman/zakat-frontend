import React, { useState } from 'react';

export default function ZakatCalculator() {
  const [wealth, setWealth] = useState('');
  const [zakat, setZakat] = useState(null);

  const handleCalculate = async () => {
    const response = await fetch('http://localhost:5000/calculate-zakat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wealth: parseFloat(wealth) }),
    });
    const data = await response.json();
    setZakat(data.zakat);
  };

  const recommendedCharities = [
    { name: 'Islamic Relief USA', url: 'https://irusa.org/donate/' },
    { name: 'Penny Appeal USA', url: 'https://pennyappealusa.org/donate/' },
    { name: 'Zakat Foundation of America', url: 'https://www.zakat.org/' },
    { name: 'Muslim Aid USA', url: 'https://www.muslimaidusa.org/' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg">
        <img 
          src="https://source.unsplash.com/featured/?islam,charity" 
          alt="Zakat Charity" 
          className="w-full h-40 object-cover rounded-t-xl mb-4"
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Zakat Calculator</h1>
        <p className="text-gray-500 mb-6">
          "Purify Your Wealth, Fulfill Your Duty"
        </p>

        <input
          type="number"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter your total wealth ($)"
          value={wealth}
          onChange={(e) => setWealth(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600 transition"
          onClick={handleCalculate}
        >
          Calculate Zakat
        </button>

        {zakat !== null && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Your Zakat Obligation:</h3>
            <p className="text-green-500 text-2xl font-bold">${zakat}</p>

            <div className="mt-4">
              <h4 className="text-gray-700 font-semibold mb-2">Recommended Charities:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {recommendedCharities.map((charity, index) => (
                  <li key={index}>
                    <a 
                      href={charity.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {charity.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500 text-center">
          <p><strong>“Take from their wealth a charity by which you purify them and cause them to increase.”</strong></p>
          <p>(Surah At-Tawbah 9:103)</p>
        </div>
      </div>
    </div>
  );
}


import React from 'react'
import { Link } from 'react-router-dom'

const hexagonPositions = [
    { x: 100, y: 50, scale: 1.5 },
    { x: 300, y: 100, scale: 1.2 },
    { x: 600, y: 200, scale: 1.8 },
    { x: 900, y: 300, scale: 1.4 },
    { x: 200, y: 400, scale: 1.6 },
    { x: 500, y: 700, scale: 1.3 },
    { x: 700, y: 500, scale: 1.7 },
    { x: 1000, y: 700, scale: 1.2 },
  ]

const Landing = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center bg-black">
      {/* Glowing Hexagon Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, rgba(0, 10, 50, 0.8) 20%, rgba(0, 0, 0, 1) 100%)",
          }}
        ></div>
        {/* Fixed Glowing Hexagons */}
        <div className="absolute inset-0 flex justify-center items-center">
          <svg width="100%" height="100%">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="1" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </radialGradient>
            </defs>
            {hexagonPositions.map((hex, i) => (
              <polygon
                key={i}
                points="50,15 90,35 90,75 50,95 10,75 10,35"
                fill="url(#glow)"
                stroke="rgba(79, 70, 229, 0.6)"
                strokeWidth="2"
                opacity="0.4"
                transform={`translate(${hex.x},${hex.y}) scale(${hex.scale})`}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 w-full max-w-10xl mx-auto p-4 flex justify-between items-center bg-white/20 backdrop-blur-md shadow-lg mb-20">
        <div className="flex items-center">
          <img src="/gameSphere_logo.png" alt="GameSphere Logo" className="w-15 h-14 object-contain" />
        </div>
        <div className="space-x-4">
        <Link
          to="/login"
          className="bg-black text-blue-600 hover:bg-zinc-200 px-5 py-3 rounded-full transition duration-300 shadow-lg transform hover:scale-110 mt-20"
        >
          Sign in
        </Link>
        <Link 
          to="/signup"
          className="bg-black text-blue-600 hover:bg-zinc-200 px-5 py-3 rounded-full transition duration-300 shadow-lg transform hover:scale-110 mt-20"
        >
          Register
        </Link>
        </div>

      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center w-full mt-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-14 text-white relative">
          <span className="absolute inset-0 text-white blur-sm select-none">GAMESPHERE</span>
          <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-200">GAMESPHERE</span>
        </h1>

        <p className="text-xl md:text-2xl font-serif italic text-white/80 max-w-3xl mx-auto leading-relaxed">
          Helping Sports Players and Clubs connect worldwide to showcase talent and find the perfect match.
        </p>

        <Link
          to="/login"
          className="bg-white text-blue-600 hover:bg-zinc-200 px-5 py-3 rounded-full transition duration-300 shadow-lg transform hover:scale-110 mt-20"
        >
          Get Started
        </Link>
      </main>
    </div>
  )
}

export default Landing
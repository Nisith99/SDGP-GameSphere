import React from "react";

const Feed = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Profile Info */}
      <div className="flex items-center space-x-3">
        <img
          src="https://cdn.britannica.com/25/222725-050-170F622A/Indian-cricketer-Mahendra-Singh-Dhoni-2011.jpg"
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-semibold">MS DOHNI</h2>
          <p className="text-green-600 text-sm">Crickter</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-700">
      Cricket is a bat-and-ball game played between two teams of eleven players on a field,
      at the centre of which is a 22-yard (20-metre; 66-foot) pitch with a wicket at each end,
      each comprising two bails (small sticks) balanced on three stumps.
      </p>

      {/* Player Stats Box */}
      <div className="bg-green-50 p-3 rounded-lg mt-3">
        <h3 className="font-medium text-green-700 mb-2 flex items-center">
          🏆 Player Stats
        </h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-lg font-bold">16.5</p>
            <p className="text-gray-500 text-sm">Points</p>
          </div>
          <div>
            <p className="text-lg font-bold">7.2</p>
            <p className="text-gray-500 text-sm">Assists</p>
          </div>
          <div>
            <p className="text-lg font-bold">30</p>
            <p className="text-gray-500 text-sm">Games</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex space-x-2 mt-3">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
          #cricket
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
          #guard
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
          #manchester
        </span>
      </div>

      {/* Post Image */}
      <div className="mt-3">
        <img
          src="https://cdn.britannica.com/63/211663-050-A674D74C/Jonny-Bairstow-batting-semifinal-match-England-Australia-2019.jpg"
          alt="cricket"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Feed;

import React from 'react'

function Profile({show, user, onClose}) {
  return (
    <>
    {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 bg-gradient-to-r from-blue-100 to-blue-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => onClose(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              style={{
                border: 'none',
                cursor: "pointer",
                fontSize: "15px"
              }}
            >
              ✕
            </button>
            <div className="text-center">
              <img
                src={user.profile}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-200"
              />
              <h2 className="text-xl font-semibold text-blue-800">{user.username}</h2>
              <p className="text-sm text-gray-600 mt-2">{user.email}</p>
              <p className="text-sm text-gray-600">{user.contact}</p>
              
            </div>
          </div>
        </div>
      )}
      </>
  )
}

export default Profile
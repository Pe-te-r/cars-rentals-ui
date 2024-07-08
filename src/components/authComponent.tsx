const AuthController = ({ isOpen, closeModal, isLogin }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">{isLogin ? 'Login' : 'Register'}</h2>

        {isLogin ? (
          // Login Form
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-white">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none"
            >
              Login
            </button>
          </form>
        ) : (
          // Register Form
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-white">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block mb-1 text-white">Role</label>
              <select
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none"
            >
              Register
            </button>
          </form>
        )}

        {/* Toggle button */}
        <div className="mt-4 text-center">
          <button
            onClick={closeModal}
            className="text-sm text-yellow-500 hover:text-yellow-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthController;

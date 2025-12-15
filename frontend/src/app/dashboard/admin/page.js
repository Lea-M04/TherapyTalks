export default function AdminHome() {
  return (
  <div className="p-6">
    <div className="bg-white border border-primary/20 rounded-xl p-6 shadow-sm">

      <h1 className="
        text-3xl font-bold 
        bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink 
        text-transparent bg-clip-text
      ">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-primary-dark/80 text-lg">
        Welcome admin 👋  
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="p-5 rounded-lg bg-primary-purple text-white shadow hover:shadow-md transition">
          <div className="text-xl font-semibold">Users</div>
          <div className="text-3xl font-bold mt-2">245</div>
        </div>

        <div className="p-5 rounded-lg bg-primary-pink text-white shadow hover:shadow-md transition">
          <div className="text-xl font-semibold">Bookings</div>
          <div className="text-3xl font-bold mt-2">87</div>
        </div>

        <div className="p-5 rounded-lg bg-primary-dark text-white shadow hover:shadow-md transition">
          <div className="text-xl font-semibold">Revenue</div>
          <div className="text-3xl font-bold mt-2">€1,240</div>
        </div>

        <div className="p-5 rounded-lg bg-primary text-white shadow hover:shadow-md transition">
          <div className="text-xl font-semibold">Messages</div>
          <div className="text-3xl font-bold mt-2">32</div>
        </div>

      </div>
    </div>
  </div>
);
}


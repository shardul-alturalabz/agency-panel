export default function StatsSection() {
  return (
    <div className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">10+</h2>
            <p className="text-gray-300">Agencies</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">20K+</h2>
            <p className="text-gray-300">Users</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">300K+</h2>
            <p className="text-gray-300">Hours spent</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">₹124K+</h2>
            <p className="text-gray-300">Payouts</p>
          </div>
        </div>
      </div>
    </div>
  )
}

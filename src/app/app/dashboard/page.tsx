export default function DashboardPage() {
    return (
      <div className="min-h-screen px-6 py-10 space-y-12">
        <h1 className="text-4xl font-bold text-center">CryptoWeather Nexus</h1>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">🌦 Weather</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Weather cards will go here */}
          </div>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">🪙 Crypto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Crypto cards will go here */}
          </div>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">📰 News</h2>
          <div className="space-y-4">
            {/* News cards will go here */}
          </div>
        </section>
      </div>
    );
  }
  
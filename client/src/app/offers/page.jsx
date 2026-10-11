"use client"
const offers = [
  {
    title: "Buy 2 Get 1 Free - Coca-Cola",
    validity: "Valid till 31 Dec 2025",
  },
  {
    title: "Flat 20% Off on Pepsi Packs",
    validity: "Valid till 15 Dec 2025",
  },
  {
    title: "Combo: Sprite + Fanta - Only ₹90",
    validity: "Limited stock offer",
  }
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-12">
          Special Offers
        </h1>

        <div className="space-y-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center hover:shadow-2xl transition duration-300 border-l-4 border-blue-600"
            >
              <div>
                <h2 className="font-semibold text-xl text-gray-800">{offer.title}</h2>
                <p className="text-gray-600 mt-1">{offer.validity}</p>
              </div>
              <span className="text-2xl animate-bounce">🔥</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

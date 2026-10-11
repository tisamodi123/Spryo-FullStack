"use client"

const reviews = [
  {
    name: "Rohit Sharma",
    feedback: "Love the cold drinks! Super fast delivery and amazing taste.",
  },
  {
    name: "Anjali Mehra",
    feedback: "The Fanta Orange Punch is my favorite. Refreshing!",
  },
  {
    name: "Vikram Singh",
    feedback: "Great variety and quality drinks. Highly recommend ColdWave.",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-12">
          Customer Reviews
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 relative"
            >
              <span className="text-blue-600 text-4xl absolute -top-4 -left-2">“</span>
              <p className="text-gray-700 mt-4 mb-4">{rev.feedback}</p>
              <p className="text-gray-900 font-semibold text-right">- {rev.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

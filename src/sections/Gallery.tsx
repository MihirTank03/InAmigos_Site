const photos = [
  {
    src: '/images/gallery-1.jpg',
    caption: 'Volunteer induction and team building'
  },
  {
    src: '/images/slide-2.jpg',
    caption: 'Project Bachpanshala classes'
  },
  {
    src: '/images/slide-1.jpg',
    caption: 'Street animal rescue operation'
  },
  {
    src: '/images/gallery-4.jpg',
    caption: 'Community awareness drive'
  },
  {
    src: '/images/slide-4.jpg',
    caption: 'Food distribution in flood-affected areas'
  },
  {
    src: '/images/gallery-6.jpg',
    caption: 'Women empowerment workshop'
  }
];

export default function Gallery() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
            From the Ground
          </h2>
          <p className="text-charcoal/70 font-body text-lg max-w-2xl mx-auto">
            Glimpses of our volunteers in action, driving real change across communities in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index}
              className="relative h-[300px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={photo.src} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-body font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

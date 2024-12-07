export default function Loading() {
  return (
    <div className="min-h-screen bg-[#000510] flex items-center justify-center">
      <div className="relative w-64 h-64">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/loading.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

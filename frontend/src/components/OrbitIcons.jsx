export default function OrbitIcons() {

  return (

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

      <div className="absolute w-[460px] h-[460px] border border-white/10 rounded-full animate-spin-slow"></div>

      <div className="absolute w-[460px] h-[460px] animate-spin-slow">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white/40 text-3xl">
          ⚽
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/40 text-3xl">
          🏀
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 text-3xl">
          🏆
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 text-3xl">
          🎾
        </div>

      </div>

    </div>

  );
}
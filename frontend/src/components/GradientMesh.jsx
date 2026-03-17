export default function GradientMesh() {

  return (

    <div className="absolute inset-0 -z-10 overflow-hidden">

      <div className="absolute w-[700px] h-[700px] bg-purple-600/40 blur-[140px] rounded-full top-[-200px] left-[-200px] animate-blob"></div>

      <div className="absolute w-[700px] h-[700px] bg-blue-500/40 blur-[140px] rounded-full bottom-[-200px] right-[-200px] animate-blob animation-delay-2000"></div>

      <div className="absolute w-[700px] h-[700px] bg-indigo-500/40 blur-[140px] rounded-full top-[200px] right-[200px] animate-blob animation-delay-4000"></div>

    </div>

  );
}
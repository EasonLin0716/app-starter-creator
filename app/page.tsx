export default function Home() {
  return (
    <>
      <main className="py-20 px-12 text-center flex flex-col items-center gap-5">
        <h1 className="text-blue text-5xl text-hover:red cursor-default">App Starter Creator</h1>
        <p>Frontend apps starter generator</p>
        <div className="flex gap-5">
          <label className="flex gap-1">
            <input type="radio" name="build-tool" />
            <span>Vite</span>
          </label>
          <label className="flex gap-1">
            <input type="radio" name="build-tool" />
            <span>Webpack</span>
          </label>
          <label className="flex gap-1">
            <input type="radio" name="build-tool" />
            <span>Rspack</span>
          </label>
        </div>
      </main>
    </>
  );
}

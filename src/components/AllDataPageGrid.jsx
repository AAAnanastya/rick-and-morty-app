export default function AllDataPageGrid({ background, children }) {
  return (
    <div style={{ backgroundImage: `url(${background})` }} className="bg-cover bg-fixed bg-no-repeat h-full min-h-[100vh] w-full">
      <div className="grid grid-cols-1 grid-rows-auto max-w-[1150px] mx-auto justify-items-center pt-[60px]">{children}</div>
    </div>
  );
}

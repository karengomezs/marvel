import Youtube from "@/components/youtube";

export default function Anounces() {
  return (
    <div className="flex flex-col items-center lg:flex-row gap-5 text-gold-1 lg:h-48 ">
      {/* progress */}
      <div className="border-[0.75px] border-gold-2 w-full flex-1 rounded-md h-full flex flex-col justify-center py-2">
        <p className="text-center mb-3">PROGRESS OF PRODUCED FILMS</p>
        <p className="font-regular text-xs text-gold-2 pe-[10%] text-right">
          Production Goals: <br /> 100 movies
        </p>
        <div className="border-2 border-gold-2 w-[80%] h-8 mx-auto p-1 m-2 skew">
          <div className="bg-gold-1 m-auto w-full h-full">
            <div className="progress-bar w-[60%] h-full"></div>
          </div>
        </div>
        <p className="font-regular text-xs blue-font pe-[43%] text-right">
          Produced Movies: <br /> 60 Movies
        </p>
      </div>
      {/* youtube */}
      <div className="border-[0.75px] border-gold-2 w-full lg:w-80 h-full p-1 rounded-md flex items-center justify-center bg-dark-1">
        <Youtube />
      </div>
      {/* imagen div */}
      <div className="border-[0.75px] border-gold-2 w-full lg:w-80 h-full rounded-md ">
        <img
          className="object-cover h-full rounded-md"
          src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2018/12/infinity-war.jpg?fit=1000%2C563&quality=50&strip=all&ssl=1"
          alt=""
        />
      </div>
    </div>
  );
}

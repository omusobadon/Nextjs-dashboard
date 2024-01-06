import Seat from "@/components/component/Chinema/Seat";

export default function ReservationMoviePage() {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 my-10 gap-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div>選択可能</div>
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div>選択不可</div>
        </div>
        <Seat />
        
    </div>
  )
}
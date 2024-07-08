import SideNav from "./SideNav"
import Content from "./Content"

const DashBoard = () => {
  return (
    <div className="flex flex-row">
      <SideNav/>
      <Content/>      
    </div>
  )
}

export default DashBoard

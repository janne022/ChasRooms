import logo from "@assets/images/piglinhead.webp"

const Header = () => {
  return (
    <div className='p-2 m-2 border rounded-2xl flex items-center gap-2 fixed w-[95%] bg-white z-50'>
      <img className='w-7' src={logo} />
      <h3>Piglin Brutes</h3>
    </div>
  )
}

export default Header

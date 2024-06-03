'use client'

export const Header = () => {
  const handleClose = () => {
    if (window.confirm('Are you sure you want to close this window?')) {
      window.close()
    }
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const handleMinimize = () => {
    alert('i dont know how to do this yet!')
  }

  return (
    <header className='relative flex items-center justify-between px-4 py-3'>
      <div className='absolute space-x-2'>
        <button className='h-3 w-3 rounded-full bg-[#898989]' aria-label='Close' onClick={handleClose} />
        <button className='h-3 w-3 rounded-full bg-[#898989]' aria-label='Minimize' onClick={handleMinimize} />
        <button className='h-3 w-3 rounded-full bg-[#898989]' aria-label='Maximize' onClick={handleFullscreen} />
      </div>
      <p className='mx-auto select-none font-semibold'>iTerm</p>
    </header>
  )
}

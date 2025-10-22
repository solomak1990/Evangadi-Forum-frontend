import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Layout({children}) {
  return (
    <div>
        <Header/>
<<<<<<< HEAD
        <main style={{ minHeight: '60vh', padding: '16px 0' }}>
=======
        <main style={{ minHeight: '60vh', padding: '0 0' }}>
>>>>>>> 35ad484c3bdb969e09520c0e8e10838a8dce1e80
          {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout
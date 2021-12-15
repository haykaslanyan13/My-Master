import React from 'react'
import Navbar from '../components/Navbar'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

function Home() {
    return (
        <div>
           <Navbar />
           {/* <SignUp /> */}
           <SignIn />
           {/* <div>dfff</div> */}
        </div>
    )
}

export default Home

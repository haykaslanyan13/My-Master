import React from 'react'
import Navbar from '../components/Navbar'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import AllServices from './AllServices'

function Home() {
    return (
        <div>
           <Navbar />
           <AllServices />
           {/* <SignUp /> */}
           {/* <SignIn /> */}
           {/* <div>dfff</div> */}

        </div>
    )
}

export default Home

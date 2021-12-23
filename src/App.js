import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './components/Homepage/BookingOptions/BookingOptions.css'
import './components/Homepage/EcoworkAppSection/EcoworkAppSection.css'
import './components/Homepage/FindYourBestWorkspace/FindYourBestWorkspace.css'
import './components/Homepage/Footer/Footer.css'
import './components/Homepage/Header/Header.css'
import './components/Homepage/InstagramAndNewsletterSection/InstagramAndNewsletterSection.css'
import './components/Homepage/TestimonialSection/TestimonialSection.css'
import './components/Homepage/WhyEcoworksSection/WhyEcoworksSection.css'
import './components/RoomBookingPage/RoomBooking/RoomBooking.css'
import './components/RoomBookingPage/BookingHistory/BookingHistory.css'
import Homepage from './components/Homepage/Home/Home'
import RoomBooking from './components/RoomBookingPage/RoomBooking/RoomBooking'
import BookingHistory from './components/RoomBookingPage/BookingHistory/BookingHistory'
import AdminPage from './components/AdminPanel/AdminPage/AdminPage'
import NotFound from './components/NotFound/404'
const App = () => {
	//   const isAuthenticated = sessionStorage.getItem("userType");
	return (
		<div className="Main">
			<Router>
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route
						exact
						path="/roomBooking"
						render={(props) => <RoomBooking {...props} />}
					/>
					<Route
						exact
						path="/roomBooking/:id"
						render={(props) => <RoomBooking {...props} />}
					/>
					<Route
						exact
						path="/bookingHistory"
						component={BookingHistory}
					/>
					<Route exact path="/admin" component={AdminPage} />
					<Route path="*" exact={true} component={NotFound} />
				</Switch>
			</Router>
		</div>
	)
}

export default App

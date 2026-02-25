import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

class Profile extends Component {
  state = {profile: {}, status: 'LOADING'}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/profile', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    if (response.ok) {
      const data = await response.json()
      this.setState({profile: data.profile_details, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  render() {
    const {profile, status} = this.state
    if (status === 'LOADING') {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#fff" height="50" width="50" />
        </div>
      )
    }
    if (status === 'FAILURE') {
      return (
        <button type="button" onClick={this.getProfile}>
          Retry
        </button>
      )
    }
    return (
      <div>
        <img src={profile.profile_image_url} alt="profile" />
        <h1>{profile.name}</h1>
        <p>{profile.short_bio}</p>
      </div>
    )
  }
}

export default Profile

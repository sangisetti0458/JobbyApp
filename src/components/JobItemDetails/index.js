import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    job: {},
    similarJobs: [],
    apiStatus: 'LOADING',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    if (response.ok) {
      const data = await response.json()
      this.setState({
        job: data.job_details,
        similarJobs: data.similar_jobs,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {job, similarJobs} = this.state

    return (
      <>
        <Header />

        <div className="job-details-container">
          <img src={job.company_logo_url} alt="job details company logo" />
          <h1>{job.title}</h1>

          <p>{job.rating}</p>
          <p>{job.location}</p>
          <p>{job.employment_type}</p>
          <p>{job.package_per_annum}</p>

          <h1>Description</h1>
          <p>{job.job_description}</p>

          <a href={job.company_website_url} target="_blank" rel="noreferrer">
            Visit
          </a>

          <h1>Skills</h1>
          <ul>
            {job.skills.map(each => (
              <li key={each.name}>
                <img src={each.image_url} alt={each.name} />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>

          <h1>Life at Company</h1>
          <img src={job.life_at_company.image_url} alt="life at company" />
          <p>{job.life_at_company.description}</p>

          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(each => (
              <li key={each.id}>
                <img
                  src={each.company_logo_url}
                  alt="similar job company logo"
                />
                <h1>{each.title}</h1>
                <p>{each.rating}</p>
                <p>{each.location}</p>
                <p>{each.employment_type}</p>
                <p>{each.job_description}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    if (apiStatus === 'LOADING') {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (apiStatus === 'FAILURE') {
      return this.renderFailureView()
    }

    return this.renderSuccessView()
  }
}

export default JobItemDetails

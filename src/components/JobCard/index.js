import {Link} from 'react-router-dom'

const JobCard = ({jobDetails}) => {
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <img src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{location}</p>
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

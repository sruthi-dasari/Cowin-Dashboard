import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'loading',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7DaysVaccinationData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const last7DaysVaccinationData = data.last_7_days_vaccination.map(
        eachObject => ({
          vaccineDate: eachObject.vaccine_date,
          dose1: eachObject.dose_1,
          dose2: eachObject.dose_2,
        }),
      )

      const vaccinationByAgeData = data.vaccination_by_age.map(eachObject => ({
        age: eachObject.age,
        count: eachObject.count,
      }))

      const vaccinationByGenderData = data.vaccination_by_gender.map(
        eachObject => ({
          count: eachObject.count,
          gender: eachObject.gender,
        }),
      )

      this.setState({
        last7DaysVaccinationData,
        vaccinationByAgeData,
        vaccinationByGenderData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }

    // console.log(last7DaysVaccinationData)
  }

  renderSuccessView = () => {
    const {
      last7DaysVaccinationData,
      vaccinationByGenderData,
      vaccinationByAgeData,
    } = this.state
    return (
      <>
        <VaccinationCoverage data={last7DaysVaccinationData} />
        <VaccinationByGender data={vaccinationByGenderData} />
        <VaccinationByAge data={vaccinationByAgeData} />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderViewContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="website-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="website-name">Co-WIN</p>
        </div>
        <h1 className="main-heading">CoWIN Vaccination In India</h1>
        {this.renderViewContainer()}
      </div>
    )
  }
}

export default CowinDashboard

import './index.css'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

class CowinDashboard extends Component {
  state = {
    last7DaysVaccinationData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()

    const last7DaysVaccinationData = data.last_7_days_vaccination.map(
      eachObject => ({
        vaccineData: eachObject.vaccine_date,
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
        count: eachObject.vaccine_date,
        gender: eachObject.gender,
      }),
    )

    this.setState({
      last7DaysVaccinationData,
      vaccinationByAgeData,
      vaccinationByGenderData,
    })

    // console.log(last7DaysVaccinationData)
  }

  render() {
    const {
      last7DaysVaccinationData,
      vaccinationByGenderData,
      vaccinationByAgeData,
    } = this.state

    return (
      <div className="cowin-dashboard-container">
        <div className="website-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website-logo"
            className="website-logo"
          />
          <p className="website-name">Co-WIN</p>
        </div>
        <h1 className="main-heading">CoWIN Vaccination In India</h1>
        <VaccinationCoverage data={last7DaysVaccinationData} />
        <VaccinationByGender data={vaccinationByGenderData} />
        <VaccinationByAge data={vaccinationByAgeData} />
      </div>
    )
  }
}

export default CowinDashboard

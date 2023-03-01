import './index.css'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  //   ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {data} = props
  //   console.log(data)
  //   const {vaccineDate, dose1, dose2} = data

  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      {/* <ResponsiveContainer width="100%" height={500}> */}
      <BarChart
        data={data}
        margin={{
          top: 5,
        }}
        height={300}
        width={1000}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default VaccinationCoverage

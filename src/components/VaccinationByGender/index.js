import './index.css'
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-heading">Vaccination by gender</h1>
      {/* <ResponsiveContainer width="100%" height={300}> */}
      <PieChart height={300} width={1000}>
        <Pie
          cx="50%"
          cy="40%"
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default VaccinationByGender

import BarChart1 from '../BarChart/BarChart1'

const sampleData = [
    { name: "A", value: 30 },
    { name: "B", value: 80 },
    { name: "C", value: 45 },
    { name: "D", value: 60 },
    { name: "E", value: 20 }
];

export default function App1() {
    return (
        <div>
            <h2>Bar Chart with D3 & React</h2>
            <BarChart1 data={sampleData} width={500} height={500} />
        </div>
    )
}

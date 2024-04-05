import React,{useState} from 'react';
import Chart from 'react-apexcharts';



const DashBoard = ()=>{
    const [chartData, setChartData] = useState({
        options: {
          chart: {
            id: 'basic-line',
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          },
        },
        series: [
          {
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70],
          },
        ],
      });
      const analyticsData = [
        { title: 'Total Visits', value: 1500, series: [75], type: 'bar', color: '#3182CE'},
        { title: 'Pageviews', value: 3200, series: [80], type: 'bar', color: '#38A169'},
        { title: 'Bounce Rate', value: '30%', series: [30], type: 'bar', color: '#DD6B20'},
        { title: 'Revenue', value: '$12K', series: [60], type: 'bar', color: '#9A34A2'}
      ];
    return (
    <div className=" sm:col-span-5  lg:col-span-6   ml-4 grid grid-cols-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 col-span-5">
                {analyticsData.map((data, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
                    <p className="text-2xl font-bold text-gray-800 mb-4">{data.value}</p>
                    <Chart
                        options={{
                        chart: {
                            toolbar: { show: false },
                            sparkline: { enable: true }
                        },
                        xaxis: { categories: [' '] },
                        colors: [data.color]
                        }}
                        series={data.series}
                        type={data.type}
                        height={200}
                    />
                    </div>
                ))}
    </div>

        <div className='col-span-5 grid grid-cols-4'>
            <div className='col-span-2'>
                <h1>Employee Status</h1>           
                <Chart options={chartData.options} series={chartData.series} type="line" width={500} />
            </div>
            <div className="col-span-2 flex flex-col ">
            <h1 className="text-2xl font-bold mb-4">Animated Progress Bar</h1>
            <div className="w-1/2">
                <ProgressBar data={70} />
            </div>
            </div>
        </div>

    </div>
    )
}

const ProgressBar = ({ data }) => {
    const options = {
      chart: {
        type: 'bar',
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '100%',
          dataLabels: {
            position: 'top'
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      xaxis: {
        categories: ['Progress']
      }
    };
  
    const series = [{
      data: [data]
    }];
  
    return (
      <Chart options={options} series={series} type="bar" height={50} />
    );
  };
export default DashBoard
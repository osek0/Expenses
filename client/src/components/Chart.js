import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

class expChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['Red', 'Blue', 'Yellow', 'Green'],
      data: [23, 15, 52, 35]
    };
  }

  processData = ({ data }) => {
    const labels = data.map( doc => doc.date );
    console.log(labels);

  }

  drawChart = () => {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.labels,
        datasets: [{
          label: 'Amount',
          data: this.state.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          //borderColor: '#777',
          //hoverBorderColor: '#000',
          hoverBorderWidth: 2

        },{
          label: 'Amount2',
          data: [24, 32, 16, 63],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
          //borderColor: '#777',
          //hoverBorderColor: '#000',
          hoverBorderWidth: 2
      }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  componentDidMount() {
    axios.get('http://localhost:5001/exp')
      .then(response => this.processData(response))
      .catch(err => console.log(err));

    this.drawChart();
  }

  render() {
    return (
      <div>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    );
  }

}

export default expChart;
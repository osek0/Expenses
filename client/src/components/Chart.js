import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

class expChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: []
    };
  }

  //TO DO data array

  // processData = ({data}) => {
  //   const amounts = [];
  //   data.map( doc => amounts.push(doc.amount.$numberDecimal));

  //   this.setState({data: amounts});

  //   console.log(data);
  // }

  getDateArray = () => {
    const currDate = new Date();
    let pastDate = new Date();
    let dateArray = [];

    pastDate.setDate(pastDate.getDate() - 31);

    while(pastDate <= currDate) {
      dateArray.push(pastDate.toLocaleString('default', {day: '2-digit', month: 'short'}));
      pastDate.setDate(pastDate.getDate() + 1);
    }

    this.setState({labels: dateArray});
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

    this.getDateArray();
  }

  componentDidUpdate() {
    this.drawChart();

    // const htmlCanvas = document.getElementById('myChart');
    // const ctx = htmlCanvas.getContext('2d');


    // ctx.canvas.width  = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;
  }

  render() {
    return (
      <div>
        <canvas id="myChart" width="800" height="800"></canvas>
      </div>
    );
  }

}

export default expChart;
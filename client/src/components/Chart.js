import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

class expChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      food: [],
      cleaning: [],
      hygiene: [],
      hobby: [],
      fun: [],
      clothes: [],
      other: []
    };
  }

  getAmounts = (data, category) => {
    const amounts = new Array(32);

    data.map( doc => {
      for(let i=0; i<32; i++) {
        let dateA = new Date();
        let dateB = new Date(doc.date)
        dateA.setDate(dateA.getDate() -i); 

        if (amounts[i] === undefined) {
          amounts[i] = 0;
        }

        if (`${dateA.getDate()}.${dateA.getMonth()}` === `${dateB.getDate()}.${dateB.getMonth()}`) {
          amounts[i] += +doc.amount.$numberDecimal;
        } 
      }
    });

    this.setState({ [category] : amounts.reverse()});
  }

  processData = ({data}) => {

    console.log(data);

    const food = [];
    const cleaning = [];
    const hygiene = [];
    const hobby = [];
    const fun = [];
    const clothes = [];
    const other = [];

    data.map( doc => {
      switch (doc.category) {
        case 'Jedzenie':
          food.push(doc);
          break;
        case 'Środki czystości':
          cleaning.push(doc);
          break;
        case 'Higiena':
          hygiene.push(doc);
          break;
        case 'Hobby/Sport':
          hobby.push(doc);
          break;
        case 'Rozrywka':
          fun.push(doc);
          break;
        case 'Odzież':
          clothes.push(doc);
          break;
        case 'Inne':
          other.push(doc);
          break;
      }

      this.getAmounts(food, 'food');
      this.getAmounts(cleaning, 'cleaning');
      this.getAmounts(hygiene, 'hygiene');
      this.getAmounts(hobby, 'hobby');
      this.getAmounts(fun, 'fun');
      this.getAmounts(clothes, 'clothes');
      this.getAmounts(other, 'other');
    });
  }

  getDateArray = () => {
    const currDate = new Date();
    let pastDate = new Date();
    let dateArray = [];

    pastDate.setDate(pastDate.getDate() - 31);

    while(pastDate <= currDate) {
      dateArray.push(pastDate.toLocaleString('default', {
        day: '2-digit',
        month: 'short'
      }));
      pastDate.setDate(pastDate.getDate() + 1);
    }

    this.setState({labels: dateArray});
  }

  renderColors = (red, green, blue, alpha) => {
    const colors = Array(32);

    for(let i=0; i < 32; i++) {
      colors[i] = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    return colors;
  }

  renderCharts = (chartName, amounts, colors) => {
    const chart = {
      label: chartName,
      data: amounts,
      backgroundColor: this.renderColors(...colors[0]),
      borderColor: this.renderColors(...colors[1]),
      borderWidth: 1,
      //borderColor: '#777',
      //hoverBorderColor: '#000',
      hoverBorderWidth: 2
    };

    return chart;
  }

  drawChart = () => {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.labels,
        datasets: [
          this.renderCharts('Jedzenie', this.state.food, [[255, 99, 132, 0.2], [255, 99, 132, 1]]),
          this.renderCharts('Sprzątanie', this.state.cleaning, [[37, 95, 133, 0.2], [37, 95, 133, 1]]),
          this.renderCharts('Higiena', this.state.hygiene, [[249, 185, 195, 0.2], [249, 185, 195, 1]]),
          this.renderCharts('Hobby/Sport', this.state.hobby, [[0, 135, 76, 0.2], [0, 135, 76, 1]]),
          this.renderCharts('Ubrania', this.state.clothes, [[255, 200, 87, 0.2], [255, 200, 87, 1]]),
          this.renderCharts('Inne', this.state.other, [[255, 255, 255, 0.2], [255, 255, 255, 1]])
        ]
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
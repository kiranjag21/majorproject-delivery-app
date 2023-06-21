import { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../config';
import { Line } from 'react-chartjs-2';
class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }


    }

    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
       
        let monthsorted = this.props.monthWiseAvgRate.sort((a, b) => (a.month > b.month) ? 1 : -1)
        let months = [], avgratings = [];
        monthsorted.forEach(month => {
            months.push(monthNames[parseInt(month.month)]);
            avgratings.push(month.average);
        })
        const data = {
            labels: months,
            datasets: [
                {
                    label: 'Month Wise Average Rating',
                    data: avgratings
                }
            ],
            
                options: {
                    scales: {
                      yAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'probability'
                        }
                      }]
                    }     
                  }
        }
        return (
            <Line data={data} />
        );
    }

}

export default Graph;

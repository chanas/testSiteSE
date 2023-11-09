
async function getData(){
      const response = await fetch('../data/avonJulyWaterTemps.csv');  // .. to move up one folder
      const data = await response.text();      //CSV in TEXT format
      //console.log(data);

      const days = [];      // x-axis labels = days of July
      const temps2021 = [];  // Water temperature each day for July 2021
      const temps2022 = [];  // Water temperature each day for July 2021

      const table = data.split('\n').slice(1);  // Split into ind. rows and remove 1st row
      //console.log(table);

      table.forEach(row => {                    // operate on each row
            const columns = row.split(',');     // split each row into columns at each comma
            const day = columns[0];
            days.push(day);

            const temp2022 = parseFloat(columns[1]);
            temps2022.push(temp2022)

            const temp2021 = parseFloat(columns[2]);
            temps2021.push(temp2021)
            //console.log(day, temp2021, temp2022);
      })
      //console.log(days, temps2021, temps2022);
      return {days, temps2021, temps2022}
}

async function createChart(){
      const data = await getData();    //createChart will wait until getData() is done until rest of code is executed
      const ctx = document.getElementById('myChart');
      const degSym = String.fromCharCode(176);        
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.days,
            datasets: [
                {
                    label: `Avon Water Temperatures July 2021 (${degSym}C)`,
                    data: data.temps2021,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Avon Water Temperatures July 2022 (${degSym}C)`,
                    data: data.temps2022,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                }
        ]
        },
        options: {
            responsive: true,           // Re-size based on screen size
            scales: {                   // Display options for x & y axes
                x: {
                    title: {
                        display: true,
                        text: 'Day',   // x-axis title
                        font: {         // font properties
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index) {
                            // The labeling of tick marks can be controlled by code and font size
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 16  
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                },
                y: {
                    min: 0,
                    max: 80,
                    title: {
                        display: true,                          
                        text: 'Avon Water Temperatures (°C)',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        /*maxTicksLimit: data.temps2021.length,   // limit # of tickmarks*/
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Avon Water Temperatures:  July 2021 vs. July 2022',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }       
    });
}

createChart();


      
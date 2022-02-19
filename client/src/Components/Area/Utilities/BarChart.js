import * as React from 'react';
import { Box} from '@mui/material';
import { Palette } from '@devexpress/dx-react-chart';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { rating: 'Very poor', population: 5 },
  { rating: 'Poor', population: 10 },
  { rating: 'Average', population: 15 },
  { rating: 'Good', population: 40 },
  { rating: 'Excellent', population: 20 },
];

export default class BarChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data,
      name: "Cenisia"
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Box sx={{p:4, pb: 1, pt:1}}>
        <Paper>
          <Chart
            data={chartData}
            rotated={true}
            height={130}
          >
            <Palette scheme={["#577585"]} />

            <ArgumentAxis />
            <ValueAxis scaleName={"%"} tickSize={10} max={70} min={10}/>

            <BarSeries
              valueField="population"
              argumentField="rating"
            />
            <Animation />
          </Chart>
        </Paper>
      </Box>
    );
  }
}

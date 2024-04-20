
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';

import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const TrafficByDevice = (props) => {
  const {charttemp}=props;
console.log(charttemp)
  var tempCategory=charttemp.map(d=>d.category_name)
  var tempValues= charttemp.map(d=>d.orders);
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [...tempValues],
        backgroundColor: ['#3F51B5', '#e53935'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: [...tempCategory]
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
const devices= charttemp.map(d=>{return{title: d.category_name,
value: d.orders,
percentage:d.percentage,
icon: LaptopMacIcon,
color: '#3F51B5'}})
  // const devices = [

    
  //   {
  //     title: 'Electronic',
  //     value: 63,
  //     icon: LaptopMacIcon,
  //     color: '#3F51B5'
  //   },
  //   {
  //     title: 'Toys',
  //     value: 15,
  //     icon: TabletIcon,
  //     color: '#E53935'
  //   },
    
  // ];

  return (
    <Card {...props}>
      {/* <CardHeader title="Traffic by Device" /> */}
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value,
            percentage
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {percentage}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

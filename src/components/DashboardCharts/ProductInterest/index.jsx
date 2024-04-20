import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

const ProductInterest = (params) => {
    const theme = useTheme();
 const {overViewData}=params;

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories:
                    
                       ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary
                        ]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount:  11 
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'dark'
            }
        }));
    }, [primary, secondary, line, theme ]);

    const series=[
        {
            name: 'Oders',
            data:  [overViewData[0].order_count, overViewData[1].order_count, overViewData[2].order_count, overViewData[3].order_count, overViewData[4].order_count, overViewData[5].order_count, overViewData[6].order_count, overViewData[7].order_count, overViewData[8].order_count, overViewData[9].order_count, overViewData[10].order_count, overViewData[11].order_count] 
        },
        
    ]
        
   

    

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

ProductInterest.propTypes = {
    slot: PropTypes.string
};

export default ProductInterest;
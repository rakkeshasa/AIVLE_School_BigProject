import { Wrapper } from "./myinfo";
import styled from "styled-components";
import ApexCharts from "react-apexcharts";

const ChartContainer = styled.div`
    width: 40vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .apexcharts-canvas {
        width: 100% !important;
        height: 100% !important;
      }
`
const TextBox = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    color: #686963;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    font-family: 'Nanum Gothic', sans-serif;
`
  
const Categroy = (props) => {

  const option = {
    series: props.categorycount,
    chart: {
    type: 'donut',
  },
  labels: props.categorydata,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };
  // const option = {
  //   series: props.categorycount,
  //   chart: {
  //   height: 390,
  //   type: 'radialBar',
  // },
  // plotOptions: {
  //   radialBar: {
  //     offsetY: 0,
  //     startAngle: 30,
  //     endAngle: 270,
  //     hollow: {
  //       margin: 5,
  //       size: '30%',
  //       background: 'transparent',
  //       image: undefined,
  //     },
  //     dataLabels: {
  //       name: {
  //         show: false,
  //       },
  //       value: {
  //         show: false,
  //       }
  //     }
  //   }
  // },
  // colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
  // labels: props.categorydata,
  // legend: {
  //   show: true,
  //   floating: true,
  //   fontSize: '13px',
  //   position: 'left',
  //   offsetX: 140,
  //   offsetY: 15,
  //   labels: {
  //     useSeriesColors: true,
  //   },
  //   markers: {
  //     size: 0
  //   },
  //   formatter: function(seriesName, opts) {
  //     return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
  //   },
  //   itemMargin: {
  //     vertical: 3
  //   }
  // },
  // responsive: [{
  //   breakpoint: 480,
  //   options: {
  //     legend: {
  //         show: false
  //     }
  //   }
  // }]
  // };

  const colors = [
    '#3B93A5',
    '#F7B844',
    '#ADD8C7',
    '#EC3C65',
    '#CDD7B6',
    '#C1F666',
    '#D43F97',
    '#1E5D8C',
    '#421243',
    '#7F94B0',
    '#EF6537',
    '#C0ADDB'
  ]

  const option02 = {
    series: [{
    data: props.categorytotalcount
  }],
    chart: {
    height: 350,
    type: 'bar',
    events: {
      click: function(chart, w, e) {
        // console.log(chart, w, e)
      }
    }
  },
  colors: colors,
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    // categories: [
    //   ['John', 'Doe'],
    //   ['Joe', 'Smith'],
    //   ['Jake', 'Williams'],
    //   'Amber',
    //   ['Peter', 'Brown'],
    //   ['Mary', 'Evans'],
    //   ['David', 'Wilson'],
    //   ['Lily', 'Roberts'], 
    // ],
    categories: props.categorytotaldata,
    labels: {
      style: {
        colors: [],
        fontSize: '12px'
      }
    }
  }
  };
  console.log(props.categorycount);
  console.log(props.categorytotaldata);
  console.log(props.categorytotalcount);

    return(
        <>
            <Wrapper>
                <ChartContainer>
                    <TextBox>사용자가 업로드 한 강의 카테고리</TextBox>
                    <ApexCharts options={option} series={option.series} type="donut"  width={550} height={350}/>
        </ChartContainer>
                <ChartContainer>
                    <TextBox>Top 10 카테고리</TextBox>
                    <ApexCharts options={option02} series={option02.series} type="bar" width={550} height={350}/>
                </ChartContainer>
            </Wrapper>
        </>
    )
}

export default Categroy;
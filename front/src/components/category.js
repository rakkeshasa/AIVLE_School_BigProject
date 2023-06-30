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
    width: 30vw;
    height: 80px;
    display: flex;
    border: solid #E5E5E5;
    background-color: #E3F2FD;
    color: #686963;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    font-family: 'Nanum Gothic', sans-serif;
`
const option =  {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
    type: 'polarArea',
  },
  stroke: {
    colors: ['#fff']
  },
  fill: {
    opacity: 0.8
  },
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

  const option02 ={
    series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
      'United States', 'China', 'Germany'
    ],
  }
  };
const Categroy = () => {
    return(
        <>
            <Wrapper>
                <ChartContainer>
                    <TextBox>사용자가 업로드 한 강의 카테고리</TextBox>
                    <ApexCharts options={option} series={option.series} type="polarArea"  width={500} height={300}/>
        </ChartContainer>
                <ChartContainer>
                    <TextBox>Top 10 카테고리</TextBox>
                    <ApexCharts options={option02} series={option02.series} type="bar" width={500} height={300}/>
                </ChartContainer>
            </Wrapper>
        </>
    )
}

export default Categroy;
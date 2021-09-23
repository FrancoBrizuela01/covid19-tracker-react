import React,{useState, useEffect} from 'react';
import axios from "axios";
import {Line, Doughnut} from "react-chartjs-2"

const Graphics = ({data, country}) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const loadData = async () =>{
            const data = await loadDailyData();
            setDailyData(data);
        }
        loadData();
    })

    const loadDailyData = async () =>{
        try {
            const data = await axios.get("https://covid19.mathdro.id/api/daily");
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    let chart;

    if(dailyData.data && (country === "World" || country === "")){
        chart = (
            <Line   
                data={{
                    labels: dailyData.data.map(e => e.reportDate),
                    datasets: [{
                        data: dailyData.data.map(e => e.confirmed.total),
                        label: "Infected",
                        borderColor: "yellow",
                        fill: true,
                    }, {
                        data: dailyData.data.map(e => e.deaths.total),
                        label: "Dead",
                        borderColor: "red",
                        fill: true
                    }]
                 } }
                options={{
                    legend: {
                        labels: {
                            fontColor: "black",
                            fontSize: 18
                        },
                        title:{
                            display:true,
                            text: "Covid19 in the world",
                            fontColor:"black"
                        }
                    }
                  }  }
            />
         )
    }else if(data.data){
        chart = (
          <Doughnut
            data={{
              labels: ["Infected", "Recovered", "Dead"],
              datasets: [
                {
                  label: "People",
                  backgroundColor: ["yellow", "red", "green"],
                  borderColor: "black",
                  borderWidth: 1,
                  data: [
                    data.data.confirmed.value,
                    data.data.recovered.value,
                    data.data.deaths.value,
                  ],
                },
              ],
            }}
            options={{
              legend: {
                display: true,
                fontColor: "white",
              },
              title: {
                display: true,
                text: `Covid 19 en ${country}`,
                fontColor: "black",
              },
            }}
          />
        );
    }

    if(!data.data){
        return "...charging";
    }else{
        return(
            <div>
                {chart}
            </div>
        )
    }
}
 
export default Graphics;
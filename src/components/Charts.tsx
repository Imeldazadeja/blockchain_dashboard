import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts";
import {getAllAssets} from "../services/AssetService";
import * as React from 'react';
import {subDays } from "date-fns";

export default class Charts extends React.Component{

    state = {
        date: [],
        value: []
    }
    dataTVL: any = []

    dataAPR: any = [];

    componentDidMount() {
        // Fetch data tvlStackedHistory for first asset to visualize with area chart
        getAllAssets().then(response => {
            const data = response.data.map((item: any) => item["selected_farm"]);
            const tvlStackedHistory = data.map((item: any) => item[0]["tvlStakedHistory"])
            this.setState({date: tvlStackedHistory.map((item: any) => item.map((value: any) => value.date)), value: tvlStackedHistory.map((item: any) => item.map((value: any) => value.value))})


            tvlStackedHistory[0].forEach((item: any) =>
                this.dataTVL.push({
                    date: item.date,
                    value: item.value
                })
            )
        })

        // Create fake data for APR history
        for (let num = 30; num >= 0; num--) {
            this.dataAPR.push({
                date: subDays(new Date(), num).toISOString().substr(0, 10),
                value: ((Math.random() + 1) + 0.05 * Math.random()).toFixed(2),
            });
        }

    }



    render() {
        // Format long numbers in YAxis
        const dataFormat = (number: any) => {
            if(number > 1000000000){
                return (number/1000000000).toString() + 'B';
            }else if(number > 1000000){
                return (number/1000000).toString() + 'M';
            }else if(number > 1000){
                return (number/1000).toString() + 'K';
            }else{
                return number.toString();
            }
        }

        return (
            <div>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={this.dataTVL}
                               width={500}
                               height={200}
                               margin={{
                                   top: 40,
                                   right: 30,
                                   left: 20,
                                   bottom: 0,}}
                    >

                        <text x={700} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                            <tspan fontSize="20">Asset TVL</tspan>
                        </text>

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(str) => {
                                const date = new Date(str);
                                return date.toLocaleDateString('en-us', { month:"short", day:"numeric"})
                            }}
                        />
                        <YAxis dataKey="value" tickFormatter={dataFormat}/>
                        <Tooltip />
                        <Area connectNulls type="monotone" dataKey="value" stroke="#3c1361" fill="#6497b1"/>

                        <CartesianGrid strokeDasharray="5 5"/>
                    </AreaChart>
                </ResponsiveContainer>


                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={this.dataAPR}
                               width={500}
                               height={200}
                               margin={{
                                   top: 50,
                                   right: 30,
                                   left: 20,
                                   bottom: 0,}}
                    >

                        <text x={700} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                            <tspan fontSize="20">Asset APR</tspan>
                        </text>

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(str) => {
                                const date = new Date(str);
                                return date.toLocaleDateString('en-us', { month:"short", day:"numeric"})
                            }}
                        />
                        <YAxis dataKey="value"
                               tickFormatter={(number) => `${number.toFixed(2)}`}
                        />
                        <Tooltip />
                        <Area connectNulls type="monotone" dataKey="value" stroke="#3c1361" fill="#011f4b"/>

                        <CartesianGrid strokeDasharray="5 5"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        )

    }
}
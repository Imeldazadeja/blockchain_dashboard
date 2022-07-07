import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts";
import {getAllAssets} from "../services/AssetService";
import * as React from 'react';

export default class Charts extends React.Component{

    state = {
        date: [],
        value: []
    }
    data: any = []

    componentDidMount() {
        getAllAssets().then(response => {
            const data = response.data.map((item: any) => item["selected_farm"]);
            const tvlStackedHistory = data.map((item: any) => item[0]["tvlStakedHistory"])
            console.log('StackedHistory', tvlStackedHistory);
            this.setState({date: tvlStackedHistory.map((item: any) => item.map((value: any) => value.date)), value: tvlStackedHistory.map((item: any) => item.map((value: any) => value.value))})


            tvlStackedHistory[0].forEach((item: any) =>
                this.data.push({
                    date: item.date,
                    value: item.value
                })
            )
        })
    }

    render() {
        const DataFormat = (number: any) => {
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
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={this.data}
                           width={500}
                           height={200}
                           margin={{
                            top: 10,
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
                    <YAxis dataKey="value" tickFormatter={DataFormat}/>
                    <Tooltip />
                    <Area connectNulls type="monotone" dataKey="value" stroke="#3c1361" fill="#6497b1"/>

                    <CartesianGrid strokeDasharray="5 5"/>
                </AreaChart>
            </ResponsiveContainer>
        )

    }
}
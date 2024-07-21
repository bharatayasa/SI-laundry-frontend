import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import api from '../../../../services/api';
import Cookies from 'js-cookie';

const COLORS = ['#a991f7', '#f6d860', '#37cdbe', '#3d4451'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class DataStatus extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        data: [],
        };
    }

    fetchDataStatus = async () => {
        const token = Cookies.get('token');

        if (token) {
        api.defaults.headers.common['Authorization'] = token;
        try {
            const response = await api.get('/status/count');
            const transformedData = response.data.data.map(item => ({
            name: item.status_transaksi,
            value: item.count,
            }));
            this.setState({ data: transformedData });
        } catch (error) {
            console.error("There was an error fetching status!", error);
        }
        } else {
        console.log("Token is not available");
        }
    };

    componentDidMount() {
        this.fetchDataStatus();
    }

    render() {
        const { data } = this.state;

        return (
        <div className='w-72'>
            <div style={{ width: '100%', height: 400 }}>
            <div className='text-center font-semibold text-lg pt-5'>
                <p>Status Transaksi</p>
            </div>
            <ResponsiveContainer>
                <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={props => renderCustomizedLabel({ ...props, name: data[props.index].name })}
                    outerRadius={80}
                    fill="#3d4451"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                </PieChart>
            </ResponsiveContainer>
            </div>
        </div>
        );
    }
}

export default DataStatus;

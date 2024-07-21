import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../../../services/api';
import Cookies from 'js-cookie';

export default class Example extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeIndex: 0,
        };
    }

    fetchData = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/sum/setiap/bulan');
                const transformedData = response.data.data.map(item => ({
                    name: `${item.year}-${item.month}`,
                    totalHarga: item.totalHarga,
                }));
                this.setState({ data: transformedData });
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        } else {
            console.log("Token is not available");
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    handleClick = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        const { activeIndex, data } = this.state;

        return (
            <div className='rounded-lg'>
                <div style={{ width: '101%' }}>
                    <div className='text-center font-semibold text-lg py-5'>
                        <p>Data Pemasukan Setiap Bulan</p>
                    </div>
                    <ResponsiveContainer width="101%" height={400}>
                        <BarChart width={400} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 1" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="totalHarga" onClick={this.handleClick}>
                                {data.map((entry, index) => (
                                    <Cell cursor="pointer" fill={index === activeIndex ? '#a991f7' : '#a991f7'} key={`cell-${index}`} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

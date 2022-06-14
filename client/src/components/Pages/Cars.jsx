import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Modal, Input , Select  } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


import "antd/dist/antd.css";

export default function Catagories() {
    const user = localStorage.getItem("token");
    const navigate = useNavigate();
    const { Option } = Select;
    const openNotificationWithIcon = (type, title, desc) => {
        notification[type]({
            message: title,
            description: desc,
        });
    };


    const [list , setList] = useState([]);
    const getCatagoryList = async () => {
        try {
            const url = "http://localhost:8080/api/catagory";
            const data = await axios.get(url);
            setList(data.data.data)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const deleteRow = async (id) => {
        try {
            const url = `http://localhost:8080/api/cars/${id}`;
            const data = await axios.delete(url);
            openNotificationWithIcon('success', 'Success', data?.data?.message)
            getCars();
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const actions = (row) => (
        <>
            <div className='buttons-list nowrap'>
                <Button icon={<EditOutlined />} style={{ marginLeft: '5px' }} shape='circle' onClick={() => handleUpdate(row)} type='primary' />
                <Button icon={<DeleteOutlined />} style={{ marginLeft: '5px' }} shape='circle' type='danger' onClick={() => deleteRow(row._id)} />
            </div>
        </>
    );


    const columns = [
        {
            title: 'Catagory',
            dataIndex: 'catagory',
            width: '18%',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            width: '18%',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            width: '18%',
        },
        {
            title: 'Make',
            dataIndex: 'make',
            width: '18%',
        },
        {
            title: 'Registration No',
            dataIndex: 'registrationNo',
            width: '18%',
        },
        {
            title: 'Actions',
            width: '10%',
            render: (row) => (
                actions(row)
            )
        }
    ];

    const showModal = () => {
        setBtn('Add');
        setState('');
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [state, setState] = useState({
        catagory : '',
        color : '',
        model : '',
        make : '',
        registrationNo : ''

    });
    const [id, setId] = useState('');

    const handleSubmit = async () => {
        try {
            const url = "http://localhost:8080/api/cars";
            const data = await axios.post(url,  state );
            openNotificationWithIcon('success', 'Success', data?.data?.message)
            getCars();
            setIsModalVisible(false);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const [btn, setBtn] = useState(null);
    const handleUpdate = (row) => {
        setBtn('Update');
        setId(row._id)
        setState({...row})
        setIsModalVisible(true);
    }

    const Update = async () => {
        try {
            const url = `http://localhost:8080/api/cars/${id}`;
            const data = await axios.put(url, state);
            openNotificationWithIcon('success', 'Success', data?.data?.message)
            getCars();
            setIsModalVisible(false);

        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const [data, setData] = useState([]);

    const getCars = async () => {
        try {
            const url = "http://localhost:8080/api/cars";
            const data = await axios.get(url);
            setData(data.data.data)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }


    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        getCars();
        getCatagoryList();
    }, [])

    return (
        <>
            <div>
                <Button style={{ margin: '10px', float: 'right', border: '50px' }} type="primary" onClick={showModal}>
                    Add Car
                </Button>
                <Modal title={`${btn} Car`} visible={isModalVisible} footer={false}>
                    <Select defaultValue={state.catagory} onChange={(e) => setState({...state , catagory : e})}  style={{ width: 472 , marginBottom : '10px'}} >
                        {
                            list && list.map((row)=>{
                                return(<Option value={row.catagory}>
                                    {row.catagory}
                                </Option>)
                            })
                        }
                    </Select>
                    <Input style={{marginBottom : '10px'}} placeholder="Enter Color" value={state.color} onChange={(e) => setState({...state , color : e.target.value})} />
                    <Input style={{marginBottom : '10px'}} placeholder="Enter Model" value={state.model} onChange={(e) => setState({...state , model : e.target.value})} />
                    <Input style={{marginBottom : '10px'}} placeholder="Enter Make" value={state.make} onChange={(e) => setState({...state , make : e.target.value})} />
                    <Input style={{marginBottom : '10px'}} placeholder="Enter Registration No" value={state.registrationNo} onChange={(e) => setState({...state , registrationNo : e.target.value})} />
                    <Button style={{ marginRight: '5px', marginTop: '10px' }} type="danger" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button style={{ float: 'right', marginTop: '10px' }} type="primary" onClick={btn === 'Add' ? handleSubmit : Update}>
                        {btn}
                    </Button>
                </Modal>
                <Table pagination={false} columns={columns} dataSource={data} />
            </div>

        </>
    )
}







import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Modal, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


import "antd/dist/antd.css";

export default function Catagories() {
    const user = localStorage.getItem("token");
    const navigate = useNavigate();

    const openNotificationWithIcon = (type, title, desc) => {
        notification[type]({
            message: title,
            description: desc,
        });
    };

    const deleteRow = async (id) => {
        try {
            const url = `http://localhost:8080/api/catagory/${id}`;
            const data = await axios.delete(url);
            openNotificationWithIcon('success', 'Success', data?.data?.message)
            getCatagories();
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
            title: 'Catagory ID',
            dataIndex: '_id',
            width: '30%',
        },
        {
            title: 'Catagory Name',
            dataIndex: 'catagory',
            width: '30%',
        },
        {
            title: 'Actions',
            render: (row) => (
                actions(row)
            )
        }
    ];

    const showModal = () => {
        setBtn('Add');
        setCatagory('');
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [state, setCatagory] = useState('');
    const [id, setId] = useState('');

    const handleSubmit = async () => {
        try {
            const url = "http://localhost:8080/api/catagory";
            const data = await axios.post(url, { catagory: state });
            openNotificationWithIcon('success', 'Success', data?.data?.message)
            getCatagories();
            setIsModalVisible(false);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const [btn, setBtn] = useState(null);
    const handleUpdate = (row) => {
        setBtn('Update');
        setId(row._id)
        setCatagory(row.catagory)
        setIsModalVisible(true);
    }

    const Update = async () => {
        try {
            const url = `http://localhost:8080/api/catagory/${id}`;
            const data = await axios.put(url, { catagory: state });
            openNotificationWithIcon('success', 'Success', data?.data?.message)
            getCatagories();
            setIsModalVisible(false);

        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const [data, setData] = useState([]);

    const getCatagories = async () => {
        try {
            const url = "http://localhost:8080/api/catagory";
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
        getCatagories();
    }, [])

    return (
        <>
            <div>
                <Button style={{ margin: '10px', float: 'right', border: '50px' }} type="primary" onClick={showModal}>
                    Add Catagory
                </Button>
                <Modal title={`${btn} Catagory`} visible={isModalVisible} footer={false}>
                    <Input placeholder="Enter Catagory" value={state} onChange={(e) => setCatagory(e.target.value)} />
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







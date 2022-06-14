import React ,{useEffect ,useState } from 'react'
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export default function Dashboard() {
    const user = localStorage.getItem("token");
    const navigate = useNavigate();
    const [count , setCount] = useState(0);
    const getCars = async () => {
        try {
            const url = "http://localhost:8080/api/cars";
            const data = await axios.get(url);
            setCount(data.data.data.length)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        getCars();
    }, [])
    return (
        <div className={styles.signup_container}>
           <h1>Registered Cars : {count}</h1>
        </div>
    )
}

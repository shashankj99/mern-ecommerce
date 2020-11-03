import React from "react";
import Layout from "../components/Layout";
import {Jumbotron} from 'react-bootstrap';

const HomePage = (props) => {
    return (
        <div>
            <Layout>
                <Jumbotron style={{margin: '5rem'}} className='text-center'>
                    <h1>Welcome to Admin Dashboard</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dignissimos quasi quis? Ab animi aperiam beatae consectetur debitis, distinctio, nemo placeat, qui quo sed sint sunt unde. Ab, natus sequi.</p>
                </Jumbotron>
            </Layout>
        </div>
    );
}

export default HomePage;

import React from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Patrimoine from '../Pages/Patrimoine';
import Possession from '../Pages/Possession';

export default function Header({ user }) {
    const navigate = useNavigate();

    const handleSelect = (key) => {
        if (key === 'patrimoine') {
            navigate('/patrimoine');
        } else if (key === 'possession') {
            navigate('/possession');
        }
    };

    return (
        <header>
            <Container className="py-4">
                <h2 className="text-center mb-4">Bienvenu : {user} </h2>
                <Tabs defaultActiveKey="patrimoine" id="patrimoine-tabs" className="mb-3" onSelect={handleSelect}>
                    <Tab eventKey="patrimoine" title="Patrimoine">
                        <Patrimoine />
                    </Tab>
                    <Tab eventKey="possession" title="Possessions">
                        <Possession />
                    </Tab>
                </Tabs>
            </Container>
        </header>
    )
}
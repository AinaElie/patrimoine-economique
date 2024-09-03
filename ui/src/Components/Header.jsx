import React from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Header({ page }) {
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
                <Tabs defaultActiveKey={page}id="patrimoine-tabs" className="mb-3" onSelect={handleSelect}>
                    <Tab eventKey="patrimoine" title="Patrimoine">
                    </Tab>
                    <Tab eventKey="possession" title="Possessions">
                    </Tab>
                </Tabs>
            </Container>
        </header>
    )
}
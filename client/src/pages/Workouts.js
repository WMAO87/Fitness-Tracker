import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom"


function Workouts() {
    const [workouts, setWorkouts] = useState([])
    const [formObject, setFormObject] = useState({})

    useEffect(() => {
        loadWorkouts()
    }, [])

    function loadWorkouts() {
        API.getWorkouts()
            .then(res =>
                setWorkouts(res.data)
            )
            .catch(err => console.log(err));
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title) {
            API.saveWorkout({
                title: formObject.title,
                description: formObject.description
            })
                .then(res => loadWorkouts())
                .catch(err => console.log(err));
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>Record Your Workouts Below:</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            name="title"
                            placeholder="Workout Type (required)"
                            onChange={handleInputChange}
                        />
                        <TextArea
                            name="description"
                            placeholder="Enter workout description here"
                            onChange={handleInputChange}
                        />
                        <FormBtn
                        disabled={!(formObject.title)}
                            onClick={handleFormSubmit}
                        >
                            Submit Workout
                        </FormBtn>
                    </form>
                </Col>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Your Workout History</h1>
                    </Jumbotron>
                    {workouts.length ? (
                        <List>
                            {workouts.map(workout => {
                                return (
                                    <ListItem key={workout._id}>
                                        <Link to={"/workouts/" + workout._id}>
                                            <strong>
                                                {workout.title} {workout.date}
                                            </strong>
                                        </Link>
                                        {/* <DeleteBtn onClick={() => deleteWorkout(workout._id)} /> */}
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
                </Col>
            </Row>
        </Container>
    )
}

export default Workouts
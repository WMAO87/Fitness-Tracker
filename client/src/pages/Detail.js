import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { TextArea, FormBtn } from "../components/Form";

function Detail(props) {
    const [workout, setWorkout] = useState({})
    const [formObject, setFormObject] = useState({})

    useEffect(() => {
        loadWorkouts()
    }, [])

    function loadWorkouts() {
        API.getWorkout(props.match.params.id)
            .then(res => setWorkout(res.data))
            .catch(err => console.log(err));
    }
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.description) {
            console.log(formObject);
            API.updateWorkout({
                $set: {
                    description: formObject.description
                }
            })
                .then(res => loadWorkouts())
                .catch(err => console.log(err));
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <h1>
                            Workout Type | {workout.title}
                        </h1>
                        <h3>
                            Date Recorded | {workout.date}
                        </h3>
                        <h4>
                            Previous Description | {workout.description}
                        </h4>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col size="med-12">
                    <form>
                        <TextArea
                            name="description"
                            onChange={handleInputChange}
                            value={workout.description}
                        />
                        <FormBtn
                            onClick={handleFormSubmit}
                        >
                            Update Workout
                        </FormBtn>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col size="md-2">
                    <Link to="/">← Back to Workouts</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Detail;
import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

const iconPlus = (
    <svg className="bi bi-caret-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
    </svg>
);
const iconDash = (
    <svg className="bi bi-caret-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
    </svg>
);

const EditModal = (props) => {

    const task = props.task;
    const [name, setName] = useState(task.name);
    let [priorityId, setPriorityId] = useState(task.priorityId);
    const [showEditModal, setShowEditModal] = useState(false);
    const priorityString = props.priorities.find(el => el.id === priorityId).priority;

    const handleShowEditModal = () => {
        setShowEditModal(true);
    }
    const handleCloseEditModal = () => {
        setName(task.name);
        setPriorityId(task.priorityId);
        setShowEditModal(false);
    }

    const onPriorityUp = (e) => {
        e.preventDefault();
        setPriorityId(--priorityId);
    }

    const onPriorityDown = (e) => {
        e.preventDefault();
        setPriorityId(++priorityId);
    }

    const onUpdateTask = () => {
        const updatedTask = {...task, name: name, priorityId: priorityId};
        props.updateTask(updatedTask);
        setShowEditModal(false);
    }

    const stylePlus = {
        pointerEvents: priorityId > 1 ? '' : 'none',
        cursor: priorityId > 1 ? '' : 'not-allowed',
        opacity: priorityId > 1 ? 1 : 0.2
    }
    const styleDash = {
        pointerEvents: priorityId < 3 ? '' : 'none',
        cursor: priorityId < 3 ? '' : 'not-allowed',
        opacity: priorityId < 3 ? 1 : 0.2
    }

    return (
        <>
            <a className="card-link" href="#" onClick={handleShowEditModal}>Edit</a>
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex ml-auto">
                        <div className="card-text p-2">
                            <a className="mr-1" href="#" onClick={onPriorityDown} style={styleDash}>{iconDash}</a>
                            {priorityString === 'High Priority' &&
                            <span className="badge badge-danger">{priorityString}</span>
                            }
                            {priorityString === 'Medium Priority' &&
                            <span className="badge badge-warning">{priorityString}</span>
                            }
                            {priorityString === 'Low Priority' &&
                            <span className="badge badge-success">{priorityString}</span>
                            }
                            <a className="ml-1" href="#" onClick={onPriorityUp} style={stylePlus}>{iconPlus}</a>
                        </div>
                    </div>
                    <div className="d-flex pt-1">
                        <div className="input-group">
                                <textarea className="md-textarea form-control"
                                          rows="3"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          placeholder="Describe your task"
                                />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onUpdateTask}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditModal;
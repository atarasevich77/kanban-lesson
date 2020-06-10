import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

const DeleteModal = (props) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowDeleteModal = (e) => {
        setShowDeleteModal(true);
    }

    const handleCloseDeleteModal = (e) => {
        setShowDeleteModal(false);
    }

    const onDeleteTask = () => {
        props.deleteTask(props.task);
        setShowDeleteModal(false);
    }

    return (
        <>
            <a className="card-link ml-auto" href="#" onClick={handleShowDeleteModal}>Delete</a>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete task</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this task?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onDeleteTask}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;
import React, {useState} from 'react';

const DeleteModal = (props) => {

    const [show, setShow] = useState('show');

    const getModalStyle = {
        paddingRight: '17px',
        display: show ? 'block' : 'none',
        cursor: 'default'
    }

    const onClose = () => {
        setShow('');
        props.setShowDeleteModal(false);
        document.body.classList.remove('modal-open');
    }

    const onDeleteTask = () => {
        props.deleteTask(props.task);
        onClose();
    }

    return (
        <div className={"modal fade " + show} id="deleteModal" tabIndex="-1" role="dialog" aria-hidden={true} style={getModalStyle}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete task</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                            <span aria-hidden={true}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Do you want to delete this task?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={onDeleteTask}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
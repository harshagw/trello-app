import React, { useState } from 'react';
import Modal from '../../components/Modal';

const CardDetails = ({open, setOpen}) => {
    return (
        <Modal onClose={() => setOpen(prev => setOpen(false))} >
            <div className='card-details'>
                <h4>Its a modal.</h4>
            </div>
        </Modal>
    );
}

export default CardDetails;
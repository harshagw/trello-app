import React from 'react';
import {BiCommentDetail} from 'react-icons/bi';
import {BsThreeDots} from "react-icons/bs";
import CardDetails from './CardDetails';

const Card = () => {
  return (
    <div className='board_list_card'>
        <div className='card_header'>
            <div className='card_tags'>
                <a href='#'>Family</a>
                <a href='#'>High priority</a>
                <a href='#'>Personal</a>
            </div>
            {/* <BsThreeDots /> */}
        </div>
        

        <h5>Home business advertisment ideas</h5>
        <p>Sustainable business know the importance of good relationship with the customer base.</p>

        <div className='card_bottom_bar'>
            <div className='card_assignees'>
                <a href='#'>HA</a>
                <a href='#'>YA</a>
            </div>
            <div className='card_properties'>
                <div className='card_property'>
                    <BiCommentDetail />
                    <span>5</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Card;
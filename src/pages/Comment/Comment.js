import React from "react";

 import MenuItem from './MenuItem/MenuItem'
 import CommentEdit from '././CommentEdit/CommentEdit'
 import CommentList from '././CommentList/CommentList'
 import { useParams } from "react-router-dom";
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Comment = () => {
  const {id} = useParams();

  return (
    <div>
        <MenuItem id={id}/>
        <CommentEdit id={id}/>
        <CommentList id={id}/>
        <ToastContainer />

    </div>
  );
};

export default Comment;
import React from "react";

 import MenuItem from './MenuItem/MenuItem'
 import CommentEdit from '././CommentEdit/CommentEdit'
 import CommentList from '././CommentList/CommentList'
 import { useParams } from "react-router-dom";


const Comment = () => {
  const {id} = useParams();

  return (
    <div>
        <MenuItem id={id}/>
        <CommentEdit id={id}/>
        <CommentList id={id}/>
    </div>
  );
};

export default Comment;
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import "./CommentList.css";
import { format } from 'date-fns';




const CommentListShow = ({ comments }) => {
  return (
    <div>
      <ul style={commentStyle}>
        <h1 style={headerPrimary}>Ürün Yorumları</h1>
        {comments.map((comment, index) => (
          <li key={index} style={listItemStyle}>
            <strong>{comment.userName}:</strong> {comment.commentText}{' '}
            <span style={{ fontSize: '0.8em', color: 'gray' }}>
              ({format(new Date(comment.commentDate), 'yyyy-MM-dd HH:mm:ss')})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CommentList = (id) => {
  const [comments, setComments] = useState([]);
  const { id: routeId } = useParams(); // useParams ile id'yi al


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/commentList/${routeId}`); 
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          throw new Error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);


  return (
    <Container>
      
    <FormCategory>
      { (
        <>
          <CommentListShow comments={comments} style={commentListShowStyle}/>
        </>
      )}
    </FormCategory>
  
  </Container>
  );
};

const commentStyle = {
    listStyle: 'none',
    paddingLeft: 0,
    marginLeft: 0,
  };

  const listItemStyle = {
    marginBottom: '30px',
    textAlign: 'left',
  };

  const commentListShowStyle = {
    marginBottom: '30px',
    textAlign: 'left',
  };

  const headerPrimary = {
    textAlign: 'center',
    marginBottom:'40px',
    color: '#c10e18',
  };


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: #cac6c6;
  max-width: 90%; 
  margin: 0 auto; 
`;


const FormCategory = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 1000px;
`;




export default CommentList;

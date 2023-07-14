import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from "react";
import { supabase } from "./supabaseData";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import {useAuthContext} from "../auth";
import {Link} from "react-router-dom";
export default function Comments({stallId}) {
  const {userData} = useAuthContext();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [reload, setReload] = useState(true);
  useEffect(() => {
    if (stallId) {
      supabase
        .from('comments')
        .select(`
          *,
          users(*)
        `)
        .eq('stall_id', stallId)
        .then(({data, error}) => {
          if (data) {
            setComments(data);
          }
        })
    }
  }, [stallId, reload]);

  const handleClickComment = async () => {
    try {
      await supabase
        .from('comments')
        .insert([
          {
            comment: comment,
            stall_id: stallId,
            user_id: userData.id
          }
        ]);
      setReload(!reload);
    } catch (err) {

    }
  }

  return (
    <Box>
      <Box >
        <Typography variant={'h5'}>Comments</Typography>
        <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
          {comments.map(comment => {
            return (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={comment.users.avatar}/>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link to={`/profile/${comment.users.google_id}`}>
                      {comment.users.username}
                    </Link>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment.comment}
                      </Typography>
                      <p>
                        {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Box>
        <TextField
          multiline
          rows={4}
          value={comment}
          onChange={e => {
            setComment(e.target.value)
          }}
          size={'small'} variant={'standard'} label={'Enter comment...'}/>
        <IconButton
          disabled={!userData}
          onClick={handleClickComment}
          color={'primary'}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
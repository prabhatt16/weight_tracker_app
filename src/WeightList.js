import React, { useState } from 'react';
import './WeightList.css';
import { colors, List, ListItem, ListItemText, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { auth, db } from './firebase';
import firebase from 'firebase';

const useStyles = makeStyles((theme) =>({
    paper: {
      position: 'absolute',
      width: 400,
      margin: 0,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      margin:20,
      maxWidth:550,
      backgroundColor:colors.lightGreen[100],
  },
  }),
);

function WeightList(props) {
    const classes = useStyles();
    const [open,setOpen]=useState(false);
    const [input,setInput]=useState(''); 
    const user=auth.currentUser;
    const handleOpen =()=>{
        setOpen(true);
    };
    
    const updateWeight=()=>{
        if(user){
        db.collection('user').doc(user?.uid).collection('weight').doc(props.weight.id).set({
            weight: input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        },{merge:true});
        setOpen(false);}
    };
    return (
        <div>
            <Modal  
                open={open}
                onClose={e=>setOpen(false)}>
                    <div className={classes.paper}>
                        <h3>Edit Weight 📝</h3>
                        <input placeholder={props.weight.weight} type="number" style={{padding:'8px'}}  value={input} onChange={e=>setInput(e.target.value)}/>
                        <Button type="button" onClick={updateWeight}>update weight</Button>
                    </div>
            </Modal>
                <div className="cardContainer">
                    <CardContent>
                        <List className="weight_list">
                            <ListItem>
                                {/* <ListItemAvatar/> */}
                                <ListItemText className="listText" primary={props.weight.weight} secondary="Current weight in kg" />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions className="cardBtn">
                        <Button size="small" color="secondary" onClick={event=>{db.collection('user').doc(user?.uid).collection('weight').doc(props.weight.id).delete()}} style={{backgroundColor: colors.green[100], }}>Delete</Button>
                        <Button size="small" color='default' onClick={e=>setOpen(true)} style={{backgroundColor: colors.green[100],}}>Edit <i></i></Button>
                    </CardActions>
                </div>

                     
        </div>
    )
}

export default WeightList

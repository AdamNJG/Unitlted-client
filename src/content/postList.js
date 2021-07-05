import React from 'react';
import Posts from './posts';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import './postList.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function PostList({posts = [], setCount, count, sortBy, setSortBy}) {
   

    const classes = useStyles();

    const handleChange = (event) => {
      var sortTemp = event.target.value;
      setSortBy(sortTemp);
      setCount(prevcount => prevcount + 1)
    };

    if(posts?.length > 0){
        
    return(

      <div className="dropDown">       
              <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
 
   
        <Select width="30px"
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sortBy}
    onChange={handleChange}
  >
    <MenuItem value="Ascending">Date Ascending</MenuItem>
    <MenuItem value="Descending">Date Descending</MenuItem>
    <MenuItem value="Popular">Popularity</MenuItem>
  </Select>
  </FormControl>
        <div className="sortList" autoFocus={true}>

            {posts?.map((p,i) => 
            <Posts {...p} key={'post-' + i} count={count} setCount={setCount}/>
            )}
        </div> 
        </div>
     )} else {
         return(
           <div>
             <div> loading...</div>
            </div>
         )
     }
}
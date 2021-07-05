import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';


const Comments = ({comments, toggleComment}) => {



    return (
        <div>{comments?.length}<Button onClick={toggleComment}><CommentIcon color="primary"/></Button></div>
    )
}
export default Comments;
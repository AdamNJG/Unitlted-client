import Stared from './stared'
import Comments from './comments'
import './wall.css'

const PostStats = ({starred, setStarred, postId, setCount, starList, comments, toggleComment}) => {


    return(
        <table>
            <tr>
                <td className="postStats">
                    <table className="starTable">
                        <tr>
                            <td className="starCell">
                            {starList?.length > 0? starList.length : 0}
                            </td>
                            <td>
                            <Stared starred={starred} setStarred={setStarred} postId={postId} starNumber={starList?.length} setCount={setCount}/>
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table className="commentTable">
                        <tr>
                            <td className="commentCell">
                            {comments?.length > 0? comments.length : 0}
                            </td>
                            <td>
                            <Comments toggleComment={toggleComment}/>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
        </table>
    )
}
export default PostStats;
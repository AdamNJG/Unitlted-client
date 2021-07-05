import Logout from '../ui/logout';
import LeftTrayButton from '../ui/LeftTrayButton';
import './sidebar.css';

export default function NavigationArea({toggleDrawer, anchor}) {

    return(
        <div className="container">
            <LeftTrayButton toggleDrawer={toggleDrawer} anchor={anchor}/> <Logout />
        </div>
    )

}
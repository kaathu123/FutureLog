import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuildingColumns, faGraduationCap, faLocationDot } from "@fortawesome/free-solid-svg-icons"
 const Header = ({type}) => {
  return (
    <div className="header">
      <div className={type ==="list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faGraduationCap} />
                <span>Degree</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faGraduationCap} />
                <span>Medical</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faGraduationCap} />
                <span>Engineering</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faGraduationCap} />
                <span>Engineering</span>
            </div>
            </div>
            {type!=="list"&&
            <>
            <h1 className="headerTitle">An investment in knowledge pays the best interest.</h1>
            <p className="headerDesc">“Education is the passport to the future, for tomorrow belongs to those who prepare for it today.</p>
            <button className="headerBtn">Sign in/Register</button>
            <div className="headerSearch">
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faGraduationCap} className="headerIcon"/>
            <input type="text" placeholder="which course you prefer?" className="headerSearchInput" />
            </div>
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBuildingColumns} className="headerIcon"/>
            <input type="text" placeholder="Field?" className="headerSearchInput" />
            </div>
            <div className="headerSearchItem">
            <FontAwesomeIcon icon={faLocationDot} className="headerIcon"/>
            <input type="text" placeholder="Location?" className="headerSearchInput" />
            </div>
            <div className="headerSearchItem">
            <button className="headerBtn" >Search</button>
            </div>
        </div></>}
        </div>
    </div>
  )
}
export default Header

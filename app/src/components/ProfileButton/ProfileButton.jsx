import { Link } from "react-router-dom";

function ProfileButton() {
  return (
    <Link to="/profile">
      <button>Reading Profile</button>
    </Link>
  );
}

export default ProfileButton;

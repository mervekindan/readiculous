import "./SocialMediaItem.css";

export function SocialMediaItem({ url, title, icon }) {
  return (
    <li className="item">
      <a href={url} className="link">
        <img src={icon} alt={title} className="icon" />
        {title}
      </a>
    </li>
  );
}

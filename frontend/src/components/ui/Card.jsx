import PropTypes from "prop-types";
import "../../styles/components/Card.css";

/**
 * Card component with theme support
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.pinned=false] - Whether the card is pinned
 * @param {string} [props.priority=null] - Priority level (high, medium, low)
 * @param {boolean} [props.glow=false] - Whether to add a glowing effect
 * @param {string} [props.size=null] - Card size (sm, md, lg, full)
 * @param {boolean} [props.glass=false] - Whether to use glassmorphism effect
 * @param {boolean} [props.gradient=false] - Whether to use gradient background
 * @param {React.ReactNode} [props.header] - Card header content
 * @param {React.ReactNode} [props.footer] - Card footer content
 * @param {React.ReactNode} [props.media] - Card media content (image/video)
 * @param {React.ReactNode} props.children - Card body content
 */
const Card = ({
  pinned = false,
  priority = null,
  glow = false,
  size = null,
  glass = false,
  gradient = false,
  header,
  footer,
  media,
  children,
  className = "",
  ...rest
}) => {
  // Determine card classes based on props
  const cardClasses = [
    "card",
    pinned ? "pinned" : "",
    priority ? `card-priority-${priority}` : "",
    glow ? "card-glow" : "",
    size ? `card-${size}` : "",
    glass ? "card-glass" : "",
    gradient ? "card-gradient" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} {...rest}>
      {/* Card media (optional) */}
      {media && <div className="card-media">{media}</div>}

      {/* Card header (optional) */}
      {header && <div className="card-header">{header}</div>}

      {/* Card body (required) */}
      <div className="card-body">{children}</div>

      {/* Card footer (optional) */}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  pinned: PropTypes.bool,
  priority: PropTypes.oneOf(["high", "medium", "low", null]),
  glow: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg", "full", null]),
  glass: PropTypes.bool,
  gradient: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
  media: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;

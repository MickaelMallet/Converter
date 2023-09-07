import PropTypes from 'prop-types';

import Icon from '../ui/Icon';

function Footer({ isLiked, toggleLike }) {
  return (
    <footer>
      <Icon
        icon={isLiked ? 'heart' : 'heart-broken'}
        color={isLiked ? '#C00' : '#6E5E5E'}
        size="1.5rem"
        style={{ cursor: 'pointer' }}
        onClick={toggleLike}
      />
    </footer>
  );
}

Footer.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
};

export default Footer;

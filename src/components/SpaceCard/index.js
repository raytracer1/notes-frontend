import { formatDate } from '../../util/dateHelper';
import imgError from '../../assets/image/demo.jpg';
import './style.scss';

const SpaceCard = ({imageUrl, name, description, updatedAt}) => {
  return (
    <div
      className='card-item'
    >
      <div className='card-image'>
        <img src={imageUrl !== '' ? imageUrl : imgError}
          alt='space icon'
        />
      </div>
      <div className='card-info'>
        {
          name && (
            <div className='card-name'>
              {name}
            </div>
          )
        }
        {
          description && (
            <div className='card-description'>{description}</div>
          )
        }
        {
          updatedAt && (
            <div className='card-timestamp'>
              Last Modify: {formatDate(updatedAt)}
            </div>
          )
        }
      </div>
    </div>
  )
};

export default SpaceCard;
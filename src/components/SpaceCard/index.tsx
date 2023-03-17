import { useNavigate } from "react-router-dom";
import { formatDate } from '../../util/dateHelper';
import imgError from '../../assets/image/demo.jpg';
import './style.scss';

interface ISpaceCardProps {
  id: string,
  imageUrl: string,
  name: string,
  description: string,
  updatedAt: string,
};

const SpaceCard = ({
  id,
  imageUrl,
  name,
  description,
  updatedAt
} : ISpaceCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/space/${id}`);
  }

  return (
    <div
      className='card-item-container'
    >
      <div className='card-item'
        onClick={handleClick}
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
    </div>
  )
};

export default SpaceCard;
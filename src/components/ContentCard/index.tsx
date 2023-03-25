import { formatDate } from '../../util/dateHelper';
import MarkdownPreview from '@uiw/react-markdown-preview';
import imgError from '../../assets/image/demo.jpg';
import './style.scss';

interface IContentCardrops {
  showImage: boolean,
  imageUrl?: string,
  name: string,
  description: string,
  updatedAt: string,
  handleClick: () => void,
};

const ContentCard = ({
  showImage,
  imageUrl,
  name,
  description,
  updatedAt,
  handleClick
} : IContentCardrops) => {
  const handleClickHelper = (e:any) => {
    e.preventDefault();
    handleClick();
  }

  return (
    <div
      className='card-item-container'
    >
      <div className='card-item'
        onClick={handleClickHelper}
      >
        {
          showImage && (
            <div className='card-image'>
              <img src={imageUrl !== '' ? imageUrl : imgError}
                alt='space icon'
              />
            </div>
          )
        }
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
              <div className='card-description'>
                <MarkdownPreview
                  source={description}
                />
              </div>
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

export default ContentCard;
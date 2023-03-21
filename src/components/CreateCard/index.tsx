
import './style.scss';

interface ICreateCardProps {
  handleClick: (e:any) => void,
};

const CreateCard = ({
  handleClick,
} : ICreateCardProps) => {
  return (
    <div
      className='create-card-container'
      onClick={handleClick}
    >
      <div className='card-item'>
        <div className='first'>
        </div>
        <div className='last'>
        </div>
      </div>
    </div>
  )
};

export default CreateCard;
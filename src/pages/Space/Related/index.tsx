import { useState } from "react";
import './style.scss';

interface IRelatedListProps {
  spaceId: string,
}

function RelatedList({
  spaceId
} : IRelatedListProps) {

  const [related, setRelated] = useState<[]>([]);

  return (
    <div className='related-lists-container'>
      <div className='related-lists'>
        {
          related.length === 0 && (
            <div className='no-related'>No Related</div>
          )
        }
      </div>
    </div>
  );
}

export default RelatedList;
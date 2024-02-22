import React from 'react';
import starFullIcon from './icons/star.png';
import partialStarIcon from './icons/partialStar.png';
import unfilledStarIcon from './icons/unfilledStar.png';

export default function Ratings(props) {
    const imgs = [null, null, null, null, null];
    let ind = 0;

    for (let i=1; i<=props.fullStars; i++){
        imgs[ind++] = starFullIcon;
    }
    if (props.partialStar === 1){
        imgs[ind++] = partialStarIcon;
    }
    for (let i=1; i<=props.emptyStars; i++){
        imgs[ind++] = unfilledStarIcon;
    }

  return (
    <div className='flex flex-row justify-start items-start gap-1'>
        {imgs.map((img, index)=>{
            return <img src={img} alt="Star" key={index} className='w-4 h-4'/>
        }
        
        )}
    </div>
  )
}
